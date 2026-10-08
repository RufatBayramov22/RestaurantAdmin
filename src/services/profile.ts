import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest, RESTAURANT_ID_KEY, TOKEN_KEY } from './apiRequest';

const firstNonEmptyString = (...values: any[]): string => {
  for (const v of values) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
};

const firstPositiveNumber = (...values: any[]): number => {
  for (const v of values) {
    const n = Number(v);
    if (!Number.isNaN(n) && n > 0) return n;
  }
  return 0;
};

export type RestaurantProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  cuisineType: string;
  cuisineTypeId?: number;
  latitude?: number;
  longitude?: number;
  isPriceRangeVisible?: boolean;
  isAvailable: boolean;
  logoUrl?: string;
};

export const getProfile = async (): Promise<RestaurantProfile> => {
  const response = await apiRequest.get('/RestaurantAuth/me');
  const d = response.data?.Data ?? response.data?.data ?? response.data ?? {};

  const mappedName = firstNonEmptyString(
    d.name,
    d.Name,
    d.restaurantName,
    d.RestaurantName,
    d.fullName,
    d.FullName,
    d.companyName,
    d.CompanyName,
    d.restaurant?.restaurantName,
    d.restaurant?.RestaurantName,
    d.restaurant?.name,
    d.restaurant?.Name,
    d.Restaurant?.name,
    d.Restaurant?.Name,
    d.Restaurant?.restaurantName,
    d.Restaurant?.RestaurantName,
    d.profile?.name,
    d.profile?.Name,
  );

  const mappedId = firstPositiveNumber(
    d.restaurantId,
    d.RestaurantId,
    d.restaurant?.id,
    d.restaurant?.Id,
    d.Restaurant?.id,
    d.Restaurant?.Id,
    d.id,
    d.Id,
  );

  let finalName = mappedName;
  if (!finalName && mappedId) {
    try {
      const restaurantResponse = await apiRequest.get('/Restaurants/get-by-id', {
        params: { Id: mappedId },
      });
      const r =
        restaurantResponse.data?.Data ??
        restaurantResponse.data?.data ??
        restaurantResponse.data ??
        {};
      finalName = firstNonEmptyString(
        r.name,
        r.Name,
        r.restaurantName,
        r.RestaurantName,
        r.title,
        r.Title,
      );
    } catch (e) {
      console.log('[Profile] fallback restaurant name fetch error:', e);
    }
  }

  if (!finalName && mappedId) {
    try {
      const adminResponse = await apiRequest.get(`/Admin/reservations/restaurant/${mappedId}`);
      const raw = adminResponse.data?.Data ?? adminResponse.data?.data ?? adminResponse.data ?? {};
      const firstItem = Array.isArray(raw)
        ? raw[0]
        : Array.isArray(raw?.Items)
          ? raw.Items[0]
          : Array.isArray(raw?.items)
            ? raw.items[0]
            : raw;

      finalName = firstNonEmptyString(
        firstItem?.restaurantName,
        firstItem?.RestaurantName,
        firstItem?.restaurant?.name,
        firstItem?.restaurant?.Name,
        firstItem?.name,
        firstItem?.Name,
      );
    } catch (e) {
      console.log('[Profile] admin reservations fallback name fetch error:', e);
    }
  }

  if (mappedId) {
    await AsyncStorage.setItem(RESTAURANT_ID_KEY, String(mappedId));
  }

  return {
    id: mappedId,
    name: finalName,
    email: d.email ?? d.Email ?? '',
    phone: d.phone ?? d.Phone ?? '',
    address: d.address ?? d.Address ?? '',
    about: d.about ?? d.About ?? '',
    cuisineType: d.cuisineType?.name ?? d.CuisineType?.Name ?? d.cuisineTypeName ?? '',
    cuisineTypeId: d.cuisineTypeId ?? d.CuisineTypeId ?? d.cuisineType?.id ?? d.CuisineType?.Id,
    latitude: d.latitude ?? d.Latitude,
    longitude: d.longitude ?? d.Longitude,
    isPriceRangeVisible: d.isPriceRangeVisible ?? d.IsPriceRangeVisible,
    isAvailable: d.isAviable ?? d.IsAviable ?? d.isAvailable ?? d.IsAvailable ?? false,
    logoUrl: d.logoUrl ?? d.LogoUrl ?? d.logo ?? d.Logo,
  };
};

export type UpdateRestaurantProfilePayload = {
  phone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  about?: string;
  isPriceRangeVisible?: boolean;
  isAviable?: boolean;
  cuisineTypeId?: number;
};

export const updateRestaurantProfile = async (payload: UpdateRestaurantProfilePayload) => {
  const formData = new FormData();

  if (payload.phone !== undefined) formData.append('Phone', payload.phone);
  if (payload.address !== undefined) formData.append('Address', payload.address);
  if (payload.latitude !== undefined) formData.append('Latitude', String(payload.latitude));
  if (payload.longitude !== undefined) formData.append('Longitude', String(payload.longitude));
  if (payload.about !== undefined) formData.append('About', payload.about);
  if (payload.isPriceRangeVisible !== undefined) {
    formData.append('IsPriceRangeVisible', String(payload.isPriceRangeVisible));
  }
  if (payload.isAviable !== undefined) formData.append('IsAviable', String(payload.isAviable));
  if (payload.cuisineTypeId !== undefined) formData.append('CuisineTypeId', String(payload.cuisineTypeId));

  return apiRequest.put('/RestaurantAuth/me', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deactivateUser = async (payload?: { reason?: string; note?: string }) => {
  const body = {
    reason: payload?.reason ?? '',
    Reason: payload?.reason ?? '',
    note: payload?.note ?? '',
    Note: payload?.note ?? '',
    message: payload?.note ?? '',
    Message: payload?.note ?? '',
  };

  return apiRequest.post('/Users/deactivate', body);
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(RESTAURANT_ID_KEY);
};
