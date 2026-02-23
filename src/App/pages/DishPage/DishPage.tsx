import s from  './DishPage.module.scss'
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useParams } from 'react-router';
import parse from 'html-react-parser';
import classNames from 'classnames';
import IngredIcon from 'components/icons/IngredIcon';
import EquipIcon from 'components/icons/EquipIcon'
import { Link } from 'react-router';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/recipes'

type RecipeImage = {
  id: number;
  url: string;
  name: string;
};
 
type Ingradients = {
  id: number;
  name: string;
}

type Directions = {
  id: number;
  description: string;
}


type Recipe = {
  id: number;
  documentId: number;
  name: string;
  summary: string;
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  ingradients: Ingradients[];
  equipments: Ingradients[];
  directions: Directions[];
  images: RecipeImage[];
  };

type Response = {
  data: Recipe;
}


const DishPage = () =>{
  const [recipe, setRecipe] = useState<Recipe>();
  const {id} = useParams()
  useEffect(() => {
    const getRecipe = async () => {
      const query = qs.stringify({
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category']
      }, { encodeValuesOnly: true });
      try {
        const response = await axios.get<Response>(`${BASE_URL}/${id}?${query}`,);
        setRecipe(response.data.data);
      } catch (error) {
        console.error('Error', error);
      }
    };
    getRecipe();
  }, [id]);
  return (
      <main className={s.recipe}>
        <div className={s.recipe__title}>
          <Link to='..'><ArrowDownIcon width={32} height={32} viewBox='0 0 32 32' className={s.icon_flip} color='accent' /></Link>
          <Text view='title' tag='h1' weight='bold'>{recipe?.name}</Text>
        </div>
        <div className={s.recipe__content}>
          <div className={classNames(s.recipe__overview, s.overview)}>
            <img src={recipe?.images[0].url} alt="overview" className={s.overview__image} />
            <ul className={s.overview__list}>
              <li className={s.list__item}>
                <Text view='p-16'>Preparation</Text>
                <Text view='p-16' color='accent' className={s.text_bolder} >{recipe?.preparationTime} minutes</Text>
              </li>
              <li className={s.list__item}>
                <Text view='p-16'>Cooking</Text>
                <Text view='p-16' color='accent' className={s.text_bolder}>{recipe?.cookingTime} minutes</Text>
              </li>
              <li className={s.list__item}>
                <Text view='p-16'>Total</Text>
                <Text view='p-16' color='accent' className={s.text_bolder}>{recipe?.totalTime} minutes</Text>
              </li>
              <li className={s.list__item}>
                <Text view='p-16'>Likes</Text>
                <Text view='p-16' color='accent' className={s.text_bolder}>{recipe?.likes}</Text>
              </li>
              <li className={s.list__item}>
                <Text view='p-16'>Servings</Text>
                <Text view='p-16' color='accent' className={s.text_bolder}>{recipe?.servings} servings</Text>
              </li>
              <li className={s.list__item}>
                <Text view='p-16'>Ratings</Text>
                <Text view='p-16' color='accent' className={s.text_bolder}>{recipe?.rating}</Text>
              </li>
            </ul>
          </div>
          <p className={s.recipe__description}>{recipe && parse(recipe.summary)}</p>
          <div className={s.recipe__needs}>
            <div className={s.recipe__ingred}>
              <Text view='p-20' className={s.text_bolder}>Ingrediants</Text>
              <ul className={s.needs__list}>
                {recipe && recipe.ingradients.map((ingradient) =>{
                  return(
                    <li key={ingradient.id} className={s.needs__item}><IngredIcon className={s.item__icon} color='accent'/><Text view='p-16'>{ingradient.name}</Text></li>
                  )
                })} 
              </ul>
            </div>
            <div className={s.recipe__equip}>
              <Text view='p-20' className={s.text_bolder}>Equipment</Text>
              <ul className={s.needs__list}>
                {recipe && recipe.equipments.map((equipment) =>{
                  return(
                    <li key={equipment.id} className={s.needs__item}><EquipIcon className={s.item__icon} color='accent'/><Text view='p-16'>{equipment.name}</Text></li>
                  )
                })} 
              </ul>
            </div> 
          </div>
          <div className={s.recipe__steps}>
            <Text view='p-20' className={s.text_bolder}>Directions</Text>
            <ul className={s.steps__list}>
              {recipe && recipe.directions.map((direction, index) => {
                return(
                  <li key={direction.id} className={s.steps__item}>
                    <Text view='p-16' className={s.text_bolder}>Step {index + 1}</Text>
                    <Text view='p-14'className={s.step__info}>{direction.description}</Text>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </main>   
  )
};

export default DishPage;
