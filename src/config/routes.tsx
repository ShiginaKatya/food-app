import  { Navigate, type RouteObject } from "react-router";
import App from "../App";
import DishesPage from "../App/pages/DishesPage";
import DishPage from "../App/pages/DishPage";
import {routes} from "../App/routes"

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to={routes.recipes.mask} replace />
      },
      {
        path: routes.recipes.mask,
        element: <DishesPage />
      },
      {
        path: routes.recipe.mask,
        element: <DishPage />
      },
      // {
      //   path: "*",
      //   element: <Navigate to={routes.main.mask} replace />,
      // },
    ]
  }
];