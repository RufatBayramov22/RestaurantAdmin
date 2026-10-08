import { apiRequest } from './apiRequest';

export type CuisineOption = {
  id: string;
  name: string;
};

const CUISINE_TYPES_URL = '/CuisineTypes/get-all';

const toStringSafe = (value: unknown) => {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
};

const mapCuisineOption = (item: any): CuisineOption | null => {
  const id = toStringSafe(item?.id ?? item?.Id ?? item?.cuisineTypeId ?? item?.CuisineTypeId);
  const name = toStringSafe(item?.name ?? item?.Name ?? item?.title ?? item?.Title);

  if (!id || !name) {
    return null;
  }

  return { id, name };
};

export const fetchCuisineTypes = async (): Promise<CuisineOption[]> => {
  const response = await apiRequest.get(CUISINE_TYPES_URL);

  const data = response?.data;
  const list = Array.isArray(data?.Data)
    ? data.Data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

  return list
    .map(mapCuisineOption)
    .filter((item: CuisineOption | null): item is CuisineOption => item !== null);
};
