import {
  useGetJWTMutation,
  useAddFavoritesMutation,
  useRemoveFavoritesMutation,
} from 'api/mutations';
import { useRecipesQuery, useCategoriesQuery, useFavoritesQuery } from 'api/queries';
import banner from 'assets/food-banner.png';
import classNames from 'classnames';
import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import SearchIcon from 'components/icons/SearchIcon';
import { useState, useMemo, useDeferredValue, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router';

import s from './DishesPage.module.scss';
import Pagination from './components/Pagination';
import RecipeCard from './components/RecipeCard/RecipeCard';

const DishesPage = () => {
  const { mutate: gotJWT } = useGetJWTMutation();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      gotJWT();
    }
  }, [gotJWT]);

  const [inputValue, setInputValue] = useState('');
  const deferredValue = useDeferredValue(inputValue);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const searchValue = searchParams.get('searchValue') || '';
  const categoryId = searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : null;

  const { data, isLoading, isError, error, isFetching } = useRecipesQuery(
    page,
    searchValue,
    categoryId
  );
  const { data: categories } = useCategoriesQuery();
  const { data: favorites } = useFavoritesQuery();

  const { mutate: addFavorite, isPending: isSaving, variables: addV } = useAddFavoritesMutation();
  const {
    mutate: removeFavorite,
    isPending: isNoSaving,
    variables: removeV,
  } = useRemoveFavoritesMutation();

  const updateFilters = (key: string, value: string | number | null) => {
    setSearchParams(
      (prev) => {
        if (!value) {
          prev.delete(key);
        } else {
          prev.set(key, String(value));
        }
        if (key !== 'page') {
          prev.set('page', '1');
        }
        return prev;
      },
      { replace: true }
    );
  };

  const categoryOptions = useMemo(() => {
    const optionsList =
      categories?.map((category) => ({ key: String(category.id), value: category.title })) || [];
    return [{ key: 'all', value: 'Categories' }, ...optionsList];
  }, [categories]);

  const allPages = data?.meta.pagination.pageCount || 1;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  const cleanInput = () => {
    setInputValue('');
    updateFilters('searchValue', '');
  };

  const favoriteAction = useCallback(
    (recipeId: number, isSaved: boolean) => {
      if (isSaved) {
        removeFavorite(recipeId);
      } else {
        addFavorite(recipeId);
      }
    },
    [addFavorite, removeFavorite]
  );

  return (
    <main className={s.main}>
      <img className={s.banner_img} src={banner} alt="" />
      <div className={classNames(s.main__content, s.content)}>
        <Text className={s.content__text} view="p-20">
          Find the perfect food and <span className={s.decor}>drink ideas</span> for every occasion,
          from <span className={s.decor}>weeknight dinners</span> to{' '}
          <span className={s.decor}>holiday feasts</span>.
        </Text>
        <ul className={s.content__inputs}>
          <li className={s.inputs__search}>
            <Input
              className={s.search}
              placeholder="Enter dishes"
              value={inputValue}
              onChange={setInputValue}
              afterSlot={
                inputValue && (
                  <button className={s.search__btn} onClick={cleanInput}>
                    &times;
                  </button>
                )
              }
            />
            <Button onClick={() => updateFilters('searchValue', deferredValue)}>
              <SearchIcon className={s['icon-white']} />
            </Button>
          </li>
          <li className={s.inputs__drop}>
            <MultiDropdown
              className={s.drop}
              options={categoryOptions}
              value={
                categoryId
                  ? categoryOptions.filter((opt) => opt.key === String(categoryId))
                  : [{ key: 'all', value: 'Categories' }]
              }
              onChange={(options) => {
                const selected = options[options.length - 1];
                if (selected.key === 'all') {
                  updateFilters('categoryId', null);
                } else {
                  updateFilters('categoryId', Number(selected.key));
                }
              }}
              getTitle={(values) => {
                if (values.length === 0 || values[0].key === 'all') return 'Categories';
                return values[0].value;
              }}
            />
          </li>
        </ul>
        {isLoading || isFetching ? (
          <div className={s.content__loader}>
            <Loader size="m" />
          </div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <ul className={s.content__list}>
            {data?.data.map((recipe) => {
              const isSaved = favorites?.some((item) => item.recipe.id === recipe.id);
              const isProcessing =
                (isSaving && addV === recipe.id) || (isNoSaving && removeV === recipe.id);
              return (
                <RecipeCard
                  key={recipe.documentId}
                  recipe={recipe}
                  isSaved={!!isSaved}
                  onToggle={favoriteAction}
                  isPending={isProcessing}
                />
              );
            })}
          </ul>
        )}
        <Pagination
          stopPage={page}
          allPages={allPages}
          onPageChange={(newPage) => updateFilters('page', newPage)}
        />
      </div>
    </main>
  );
};

export default DishesPage;
