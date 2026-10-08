export type RegisterDocument = {
  uri: string;
  name: string;
  type: string;
};

export type RegisterFormValues = {
  name: string;
  cuisineTypeId: string;
  cuisineTypeName: string;
  address: string;
  latitude: string;
  longitude: string;
  about: string;
  isAviable: boolean;
  isPriceRangeVisible: boolean;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  registrationDocument: RegisterDocument | null;
};

export const initialRegisterFormValues: RegisterFormValues = {
  name: '',
  cuisineTypeId: '',
  cuisineTypeName: '',
  address: '',
  latitude: '40.409264',
  longitude: '49.867092',
  about: '',
  isAviable: true,
  isPriceRangeVisible: false,
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  registrationDocument: null,
};