import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getRecipes, getRecipe, getCategories, getFavorites } from './requests';

export const useRecipesQuery = (
  page: number,
  searchValue: string | null,
  categoryId: number | null
) =>
  useQuery({
    queryKey: ['recipes', page, searchValue, categoryId],
    queryFn: () => getRecipes(page, searchValue, categoryId),
    staleTime: 5 * 1000,
    placeholderData: keepPreviousData,
  });

export const useRecipeQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

export const useCategoriesQuery = () =>
  useQuery({ queryKey: ['categories'], queryFn: getCategories, staleTime: Infinity });

export const useFavoritesQuery = () =>
  useQuery({ queryKey: ['favorites'], queryFn: getFavorites, staleTime: 5 * 60 * 1000 });
