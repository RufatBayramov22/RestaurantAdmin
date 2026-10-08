import { RegisterFormValues } from '../types/register';
import { apiRequest } from './apiRequest';

const REGISTER_URL = '/RestaurantAuth/register';

const appendField = (formData: FormData, key: string, value: string) => {
  formData.append(key, value);
};

export const registerRestaurant = async (values: RegisterFormValues) => {
  const formData = new FormData();

  appendField(formData, 'IsAviable', String(values.isAviable));
  appendField(formData, 'Name', values.name.trim());
  appendField(formData, 'Latitude', values.latitude.trim());
  appendField(formData, 'About', values.about.trim());
  appendField(formData, 'Phone', values.phone.trim());
  appendField(formData, 'Longitude', values.longitude.trim());
  appendField(formData, 'IsPriceRangeVisible', String(values.isPriceRangeVisible));
  appendField(formData, 'Address', values.address.trim());
  appendField(formData, 'CuisineTypeId', values.cuisineTypeId.trim());
  appendField(formData, 'ConfirmPassword', values.confirmPassword);
  appendField(formData, 'Password', values.password);
  appendField(formData, 'Email', values.email.trim());

  if (values.registrationDocument?.uri?.trim()) {
    formData.append('RegistrationDocument', {
      uri: values.registrationDocument.uri,
      name: values.registrationDocument.name,
      type: values.registrationDocument.type,
    } as never);
  }

  return apiRequest.post(REGISTER_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};