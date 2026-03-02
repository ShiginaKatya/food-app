import axios, { type AxiosError } from 'axios';

const STRAPI_URL = 'https://front-school-strapi.ktsdev.ru/api';

export const getJWT = async () => {
  try {
    const login = await axios.post(`${STRAPI_URL}/auth/local`, {
      identifier: 'shigina@test.com',
      password: 'testShiginaStrapi',
    });
    return login.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: { message: string } }>;
      if (axiosError.response?.status === 400) {
        const register = await axios.post(`${STRAPI_URL}/auth/local/register`, {
          username: 'ShiginaKatya',
          email: 'shigina@test.com',
          password: 'testShiginaStrapi',
        });
        return register.data;
      }
    }
    throw error;
  }
};
