import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getJWT } from './register_auth';
import { addFavorites, removeFavorites } from './requests';

export const useGetJWTMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getJWT,
    onSuccess: (data) => {
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        // eslint-disable-next-line no-console
        console.log('JWT succes', data.jwt);
        queryClient.invalidateQueries();
      }
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error login', error);
    },
  });
};

export const useAddFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('fail add favorites', error.message);
    },
  });
};

export const useRemoveFavoritesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('fail remove fovorites', error.message);
    },
  });
};
