import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://api.dev.yerin.az/api';
export const TOKEN_KEY = 'auth_token';
export const RESTAURANT_ID_KEY = 'restaurant_id';

export const apiRequest = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: '*/*',
  },
});

apiRequest.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  console.log('[apiRequest] token present:', !!token, 'url:', config.url);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
