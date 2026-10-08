import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest, TOKEN_KEY } from './apiRequest';

export type LoginPayload = {
  email: string;
  password: string;
};

const LOGIN_URL = '/RestaurantAuth/login';

export const loginRestaurant = async (payload: LoginPayload) => {
  const response = await apiRequest.post(LOGIN_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('[Login] response data:', JSON.stringify(response.data).slice(0, 500));
  const data = response.data;
  const isSuccess = data?.IsSuccess ?? data?.isSuccess;
  const message = data?.Message ?? data?.message;
  const dataObj = data?.Data ?? data?.data;
  const token =
    // Data itself is the token string
    (typeof dataObj === 'string' ? dataObj : null) ??
    // Token nested inside Data object
    dataObj?.accessToken ??
    dataObj?.AccessToken ??
    dataObj?.token ??
    dataObj?.Token ??
    dataObj?.jwtToken ??
    dataObj?.JwtToken ??
    dataObj?.jwt ??
    dataObj?.Jwt ??
    // Flat on response root
    data?.accessToken ??
    data?.AccessToken ??
    data?.token ??
    data?.Token ??
    data?.jwtToken ??
    data?.JwtToken;

  if (isSuccess === false || !token) {
    const errorMessage =
      (typeof message === 'string' && message.trim())
        ? message
        : 'Login failed. Token not received.';
    throw new Error(errorMessage);
  }

  console.log('[Login] token saved');
  await AsyncStorage.setItem(TOKEN_KEY, token);

  return response;
};
