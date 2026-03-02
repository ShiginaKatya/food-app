import { Navigate, type RouteObject } from 'react-router';

import App from '../App';
import DishPage from '../App/pages/DishPage';
import DishesPage from '../App/pages/DishesPage';
import FavoritesPage from '../App/pages/FavoritesPage';
import { routes } from '../App/routes';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={routes.recipes.mask} replace />,
      },
      {
        path: routes.recipes.mask,
        element: <DishesPage />,
      },
      {
        path: routes.recipe.mask,
        element: <DishPage />,
      },
      {
        path: routes.favorites.mask,
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <Navigate to={routes.recipes.mask} replace />,
      },
    ],
  },
];
