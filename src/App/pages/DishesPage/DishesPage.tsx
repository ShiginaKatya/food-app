import s from './DishesPage.module.scss'
import banner from 'assets/food-banner.png'
import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import parse from 'html-react-parser';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import ClockIcon from 'components/icons/ClockIcon'
import SearchIcon from 'components/icons/SearchIcon';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/recipes'


type RecipeImage = {
  id: number;
  url: string;
  name: string;
};

type Recipe = {
  documentId: number;
  name: string;
  summary: string;
  calories: number;
  images: RecipeImage[];
  totalTime: number;
  };

type Response = {
  data: Recipe[];
};

const DishesPage = () =>{
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const getRecipes = async () => {
      const query = qs.stringify({
        populate: ['images'],
        pagination: {
        limit: 49, 
      }}, { encodeValuesOnly: true });
      try {
        const response = await axios.get<Response>(`${BASE_URL}?${query}`);
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error', error);
      }
    };
    getRecipes();
  }, []);
  return (
      <main className={s.main}>
        <img className={s.banner_img} src={banner} alt="" />
        <div className={classNames(s.main__content, s.content)}>
          <Text className={s.content__text} view='p-20'>Find the perfect food and <span className={s.decor}>drink ideas</span> for every occasion, from <span className={s.decor}>weeknight dinners</span> to <span className={s.decor}>holiday feasts</span>.</Text>
          <ul className={s.content__inputs}>
            <li className={s.inputs__search}>
              <Input className={s.search}  placeholder='Enter dishes' value={searchValue} onChange={(value: string) => {console.log(value); setSearchValue(value); }} />
              <Button><SearchIcon className={s['icon-white']}/></Button>
            </li>
            <li className={s.inputs__drop}>
              <MultiDropdown 
                className={s.drop}
                disabled
                options={[
                    { key: '1', value: 'Category 1' },
                    { key: '2', value: 'Category 2' },
                    { key: '3', value: 'Category 3' }
                ]}
                value={[{ key: '1', value: 'Category 1' }]}
                onChange={() => (console.log('Выбрано:'))}
                getTitle={() => 'Categories'}
              >
              </MultiDropdown>
            </li>
          </ul>
          <ul className={s.content__list}>
            {recipes.map((recipe) => {
              return(
              <li key={recipe.documentId} className={s.list__item} onClick={() => navigate(`/recipes/${recipe.documentId}`)} >
                  <Card
                    image={recipe.images[0].url}
                    title={recipe.name}
                    captionSlot={<span className={s.item__caption}><ClockIcon color='accent'/>{recipe.totalTime} minutes</span>}
                    subtitle={parse(recipe.summary)}
                    contentSlot={`${recipe.calories} kcal`}
                    actionSlot={<Button>Save</Button>}
                  />
              </li>
            )})}
          </ul>
        </div>
      </main>  
  )
};

export default DishesPage;
