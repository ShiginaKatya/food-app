import { useRemoveFavoritesMutation } from 'api/mutations';
import { useFavoritesQuery } from 'api/queries';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { useCallback } from 'react';

import s from '../DishesPage/DishesPage.module.scss';
import RecipeCard from '../DishesPage/components/RecipeCard/RecipeCard';

const FavoritesPage = () => {
  const { data: favorites, isLoading, isError, error, isFetching } = useFavoritesQuery();
  const {
    mutate: removeFavorite,
    isPending: isNoSaving,
    variables: removeV,
  } = useRemoveFavoritesMutation();

  const favoriteRemove = useCallback(
    (recipeId: number) => {
      removeFavorite(recipeId);
    },
    [removeFavorite]
  );
  return (
    <main className={s.main__content}>
      <Text view="title" tag="h1" weight="bold">
        Favorites Recipes
      </Text>
      {isLoading || isFetching ? (
        <div className={s.content__loader}>
          <Loader size="m" />
        </div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul className={s.content__list}>
          {favorites?.map((item) => {
            const isProcessing = isNoSaving && removeV === item.id;
            return (
              <RecipeCard
                key={item.id}
                recipe={item.recipe}
                isSaved={true}
                isPending={isProcessing}
                onToggle={() => favoriteRemove(item.recipe.id)}
              />
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default FavoritesPage;
