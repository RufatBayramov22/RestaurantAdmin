import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, apiRequest, RESTAURANT_ID_KEY } from './apiRequest';

const BASE = API_BASE_URL.replace('/api', '');

// Prepend base URL if the image path is relative
const resolveImageUrl = (raw: string): string => {
  if (!raw) return '';
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
  return `${BASE}${raw.startsWith('/') ? '' : '/'}${raw}`;
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type MenuCategory = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  categoryName: string;
};

export type MenuListResponse = {
  items: MenuItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const firstNonEmptyString = (...values: any[]): string => {
  for (const v of values) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
};

const firstDefinedValue = (...values: any[]): any => {
  for (const v of values) {
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
};

const firstNumber = (...values: any[]): number => {
  for (const v of values) {
    const n = Number(v);
    if (!Number.isNaN(n)) return n;
  }
  return 0;
};

const extractList = (raw: any): any[] => {
  if (Array.isArray(raw)) return raw;
  // Handle { data: [...], isSuccess, ... } envelope
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.Data)) return raw.Data;
  const inner = raw?.data ?? raw?.Data ?? raw;
  if (Array.isArray(inner)) return inner;
  if (Array.isArray(inner?.Items)) return inner.Items;
  if (Array.isArray(inner?.items)) return inner.items;
  if (Array.isArray(inner?.List)) return inner.List;
  if (Array.isArray(inner?.list)) return inner.list;
  return [];
};

const mapCategory = (item: any, index: number): MenuCategory => ({
  id: String(firstDefinedValue(item?.id, item?.Id, item?.categoryId, item?.CategoryId, `${Date.now()}-${index}`)),
  name: firstNonEmptyString(item?.name, item?.Name, item?.categoryName, item?.CategoryName, 'Category'),
});

const mapMenuItem = (item: any, index: number): MenuItem => {
  const rawImage = firstNonEmptyString(
    item?.imgUrl, item?.ImgUrl,
    item?.imageUrl, item?.ImageUrl,
    item?.image, item?.Image,
    item?.photoUrl, item?.PhotoUrl,
    item?.thumbnailUrl, item?.ThumbnailUrl,
    item?.photo, item?.Photo,
    item?.coverImage, item?.CoverImage,
    item?.coverUrl, item?.CoverUrl,
  );
  return {
    id: String(firstDefinedValue(item?.id, item?.Id, item?.menuId, item?.MenuId, `${Date.now()}-${index}`)),
    name: firstNonEmptyString(item?.title, item?.Title, item?.name, item?.Name, 'Item'),
    description: firstNonEmptyString(item?.description, item?.Description, item?.content, item?.Content),
    price: firstNumber(item?.price, item?.Price, item?.amount, item?.Amount),
    image: resolveImageUrl(rawImage),
    categoryId: String(firstDefinedValue(
      item?.menuCategoryId, item?.MenuCategoryId,
      item?.categoryId, item?.CategoryId,
      item?.category?.id, item?.Category?.Id,
    )),
    categoryName: firstNonEmptyString(
      item?.categoryName, item?.CategoryName,
      item?.category?.name, item?.Category?.Name,
      item?.category?.Name, item?.Category?.name,
    ),
  };
};

// ─── Restaurant ID ────────────────────────────────────────────────────────────

const getRestaurantId = async (): Promise<string> => {
  const id = await AsyncStorage.getItem(RESTAURANT_ID_KEY);
  if (!id) throw new Error('Restaurant ID not found. Please re-login.');
  return id;
};

// ─── Menus ────────────────────────────────────────────────────────────────────

export const getMenuItems = async (
  pageNumber = 1,
  pageSize = 50,
): Promise<MenuListResponse> => {
  const restaurantId = await getRestaurantId();
  const response = await apiRequest.get(
    `/RestaurantMenus/restaurant/${restaurantId}/menus`,
    { params: { PageNumber: pageNumber, PageSize: pageSize } },
  );

  const raw = response.data?.Data ?? response.data?.data ?? response.data ?? {};
  const list = extractList(raw);

  return {
    items: list.map(mapMenuItem),
    totalCount: firstNumber(raw?.totalCount, raw?.TotalCount, raw?.total, raw?.Total, list.length),
    pageNumber: firstNumber(raw?.pageNumber, raw?.PageNumber, pageNumber),
    pageSize: firstNumber(raw?.pageSize, raw?.PageSize, pageSize),
    hasNextPage: raw?.hasNextPage ?? raw?.HasNextPage ?? false,
  };
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const getMenuCategories = async (): Promise<MenuCategory[]> => {
  const response = await apiRequest.get('/MenuCategories');
  return extractList(response.data).map(mapCategory);
};

// ─── Create / Update / Delete ─────────────────────────────────────────────────

export const createMenuItem = async (payload: {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  imageFile?: { uri: string; name?: string; type?: string };
}): Promise<any> => {
  const restaurantId = await getRestaurantId();
  const formData = new FormData();

  // Send both naming styles to match backend model binding
  formData.append('RestaurantId', restaurantId);
  formData.append('restaurantId', restaurantId);

  formData.append('Name', payload.name);
  formData.append('Title', payload.name);

  if (payload.description) formData.append('Description', payload.description);

  formData.append('Price', String(payload.price));

  formData.append('CategoryId', payload.categoryId);
  formData.append('MenuCategoryId', payload.categoryId);

  if (payload.imageFile) {
    const file = {
      uri: payload.imageFile.uri,
      name: payload.imageFile.name ?? 'image.jpg',
      type: payload.imageFile.type ?? 'image/jpeg',
    } as any;

    formData.append('ImageFile', file);
    formData.append('ImgFile', file);
    formData.append('Image', file);
    formData.append('Img', file);
  }

  const response = await apiRequest.post('/Restaurants/add-restaurant-menu', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateMenuItem = async (
  id: string | number,
  payload: {
    name?: string;
    description?: string;
    price?: number;
    categoryId?: string;
    imageFile?: { uri: string; name?: string; type?: string };
  },
): Promise<any> => {
  const restaurantId = await getRestaurantId();
  const formData = new FormData();

  formData.append('Id', String(id));
  formData.append('RestaurantId', restaurantId);
  formData.append('restaurantId', restaurantId);

  if (payload.name !== undefined) formData.append('Name', payload.name);
  if (payload.name !== undefined) formData.append('Title', payload.name);

  if (payload.description !== undefined) formData.append('Description', payload.description);

  if (payload.price !== undefined) formData.append('Price', String(payload.price));

  if (payload.categoryId !== undefined) formData.append('CategoryId', payload.categoryId);
  if (payload.categoryId !== undefined) formData.append('MenuCategoryId', payload.categoryId);

  if (payload.imageFile) {
    const file = {
      uri: payload.imageFile.uri,
      name: payload.imageFile.name ?? 'image.jpg',
      type: payload.imageFile.type ?? 'image/jpeg',
    } as any;

    formData.append('ImageFile', file);
    formData.append('ImgFile', file);
    formData.append('Image', file);
    formData.append('Img', file);
  }

  const response = await apiRequest.put('/RestaurantMenus/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteMenuItem = async (id: string | number): Promise<any> => {
  const restaurantId = await getRestaurantId();
  const payload = {
    Id: id,
    id,
    MenuId: id,
    menuId: id,
    RestaurantId: restaurantId,
    restaurantId,
  };

  const attempts = [
    () => apiRequest.delete('/RestaurantMenus/delete', { params: payload }),
    () => apiRequest.delete('/RestaurantMenus/delete', { data: payload }),
    () => apiRequest.delete(`/RestaurantMenus/delete/${id}`),
    () => apiRequest.delete(`/RestaurantMenus/${id}`),
    () => apiRequest.post('/RestaurantMenus/delete', payload),
  ];

  let lastError: any;
  for (const call of attempts) {
    try {
      const response = await call();
      return response.data;
    } catch (error: any) {
      lastError = error;
    }
  }

  const message =
    lastError?.response?.data?.message ||
    lastError?.response?.data?.Message ||
    lastError?.response?.data?.errors?.[0] ||
    lastError?.response?.data?.Errors?.[0] ||
    lastError?.message ||
    'Failed to delete menu item';

  throw new Error(message);
};
