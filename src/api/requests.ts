import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/recipes';
const CATEGORY_URL = 'https://front-school-strapi.ktsdev.ru/api/meal-categories';
const FAVORITE_URL = 'https://front-school-strapi.ktsdev.ru/api';

type RecipeImage = {
  id: number;
  url: string;
  name: string;
  formats?: {
    small: {
      url: string;
    };
  };
};

type Ingradients = {
  id: number;
  name: string;
};

type Directions = {
  id: number;
  description: string;
};

export type RecipeList = {
  id: number;
  documentId: number;
  name: string;
  summary: string;
  calories: number;
  totalTime: number;
  images: RecipeImage[];
};

type Recipe = {
  id: number;
  documentId: number;
  name: string;
  summary: string;
  calories: number;
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

type RecipesResponse = {
  data: RecipeList[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

type RecipeResponse = {
  data: Recipe;
};

export const getRecipes = async (
  page: number,
  searchValue: string | null,
  categoryId: number | null
) => {
  const filters: Record<string, unknown> = {};
  if (searchValue) {
    filters.name = { $containsi: searchValue };
  }
  if (categoryId) {
    filters.category = { id: { $eq: categoryId } };
  }
  const query = qs.stringify(
    {
      populate: ['images'],
      pagination: {
        page: page,
        pageSize: 9,
      },
      filters: filters,
    },
    { encodeValuesOnly: true }
  );
  const response = await axios.get<RecipesResponse>(`${BASE_URL}?${query}`);
  return response.data;
};

export const getRecipe = async (id: string | undefined) => {
  const query = qs.stringify(
    {
      populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
    },
    { encodeValuesOnly: true }
  );
  const response = await axios.get<RecipeResponse>(`${BASE_URL}/${id}?${query}`);
  return response.data.data;
};

type Category = {
  id: number;
  title: string;
};

type CategoriesResponse = {
  data: Category[];
};

export const getCategories = async () => {
  const query = qs.stringify({ populate: '*' });
  const response = await axios.get<CategoriesResponse>(`${CATEGORY_URL}?${query}`);
  return response.data.data;
};

const API_TOKEN = localStorage.getItem('token');

type Favorites = {
  recipe: RecipeList;
  id: number;
};

type FavoritesResponse = Favorites[];

export const getFavorites = async () => {
  const response = await axios.get<FavoritesResponse>(`${FAVORITE_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data;
};

export const addFavorites = async (recipe: number) => {
  const response = await axios.post<Response>(
    `${FAVORITE_URL}/favorites/add`,
    { recipe: recipe },
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const removeFavorites = async (recipe: number) => {
  const response = await axios.post<Response>(
    `${FAVORITE_URL}/favorites/remove/`,
    { recipe: recipe },
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return response.data;
};
