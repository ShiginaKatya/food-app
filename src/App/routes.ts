export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  recipes: {
    mask: '/recipes',
    create: () => '/recipes',
  },
  favorites: {
    mask: '/favorites',
    create: () => '/favorites',
  },
  recipe: {
    mask: '/recipes/:id',
    create: (id: string) => `/recipes/${id}`,
  },
};
