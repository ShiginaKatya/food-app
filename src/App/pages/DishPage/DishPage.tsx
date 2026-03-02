import { useRecipeQuery } from 'api/queries';
import classNames from 'classnames';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import EquipIcon from 'components/icons/EquipIcon';
import IngredIcon from 'components/icons/IngredIcon';
import parse from 'html-react-parser';
import { useParams } from 'react-router';
import { Link } from 'react-router';

import s from './DishPage.module.scss';

const DishPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, isError, error } = useRecipeQuery(id);
  if (isLoading) {
    return (
      <div className={s.content__loader}>
        <Loader size="m" />
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main className={s.recipe}>
      <div className={s.recipe__title}>
        <Link to="..">
          <ArrowDownIcon
            width={32}
            height={32}
            viewBox="0 0 32 32"
            className={s.icon_flip}
            color="accent"
          />
        </Link>
        <Text view="title" tag="h1" weight="bold">
          {recipe?.name}
        </Text>
      </div>
      <div className={s.recipe__content}>
        <div className={classNames(s.recipe__overview, s.overview)}>
          <img src={recipe?.images[0].url} alt="overview" className={s.overview__image} />
          <ul className={classNames(s.overview__list, s.list)}>
            <li className={s.list__item}>
              <Text view="p-16">Preparation</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.preparationTime} minutes
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Cooking</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.cookingTime} minutes
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Total</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.totalTime} minutes
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Likes</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.likes}
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Servings</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.servings} servings
              </Text>
            </li>
            <li className={s.list__item}>
              <Text view="p-16">Ratings</Text>
              <Text view="p-16" color="accent" className={s.text_bolder}>
                {recipe?.rating}
              </Text>
            </li>
          </ul>
        </div>
        <p className={s.recipe__description}>{recipe && parse(recipe.summary)}</p>
        <div className={s.recipe__needs}>
          <div className={s.recipe__ingred}>
            <Text view="p-20" className={s.text_bolder}>
              Ingrediants
            </Text>
            <ul className={s.needs__list}>
              {recipe &&
                recipe.ingradients.map((ingradient) => {
                  return (
                    <li key={ingradient.id} className={s.needs__item}>
                      <IngredIcon className={s.item__icon} color="accent" />
                      <Text view="p-16">{ingradient.name}</Text>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={s.recipe__equip}>
            <Text view="p-20" className={s.text_bolder}>
              Equipment
            </Text>
            <ul className={s.needs__list}>
              {recipe &&
                recipe.equipments.map((equipment) => {
                  return (
                    <li key={equipment.id} className={s.needs__item}>
                      <EquipIcon className={s.item__icon} color="accent" />
                      <Text view="p-16">{equipment.name}</Text>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={s.recipe__steps}>
          <Text view="p-20" className={s.text_bolder}>
            Directions
          </Text>
          <ul className={s.steps__list}>
            {recipe &&
              recipe.directions.map((direction, index) => {
                return (
                  <li key={direction.id} className={s.steps__item}>
                    <Text view="p-16" className={s.text_bolder}>
                      Step {index + 1}
                    </Text>
                    <Text view="p-14" className={s.step__info}>
                      {direction.description}
                    </Text>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DishPage;
