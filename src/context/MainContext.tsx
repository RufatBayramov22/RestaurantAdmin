import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import axios from 'axios';

import {
	initialRegisterFormValues,
	RegisterDocument,
	RegisterFormValues,
} from '../types/register';
import { registerRestaurant } from '../services/register';

type MainContextValue = {
	registerForm: RegisterFormValues;
	updateRegisterForm: (values: Partial<RegisterFormValues>) => void;
	setRegistrationDocument: (document: RegisterDocument | null) => void;
	resetRegisterForm: () => void;
	clearSubmitError: () => void;
	submitRegisterForm: () => Promise<boolean>;
	isSubmitting: boolean;
	submitError: string | null;
};

const MainContext = createContext<MainContextValue | undefined>(undefined);

export const MainProvider = ({ children }: PropsWithChildren) => {
	const [registerForm, setRegisterForm] = useState<RegisterFormValues>(
		initialRegisterFormValues,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const updateRegisterForm = useCallback(
		(values: Partial<RegisterFormValues>) => {
			setRegisterForm(currentValues => ({ ...currentValues, ...values }));
		},
		[],
	);

	const setRegistrationDocument = useCallback((document: RegisterDocument | null) => {
		setRegisterForm(currentValues => ({
			...currentValues,
			registrationDocument: document,
		}));
	}, []);

	const resetRegisterForm = useCallback(() => {
		setRegisterForm(initialRegisterFormValues);
		setSubmitError(null);
	}, []);

	const clearSubmitError = useCallback(() => {
		setSubmitError(null);
	}, []);

	const submitRegisterForm = useCallback(async () => {
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			await registerRestaurant(registerForm);
			setRegisterForm(initialRegisterFormValues);
			return true;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const responseData = error.response?.data;
				const statusCode = error.response?.status;
				const responseErrors = Array.isArray(responseData?.Errors)
					? responseData.Errors.join('\n')
					: Array.isArray(responseData?.errors)
						? responseData.errors.join('\n')
						: null;

				const responseMessage =
					responseData?.message ||
					responseData?.Message ||
					responseData?.title ||
					responseErrors ||
					responseData ||
					error.message;

				const normalizedMessage =
					typeof responseMessage === 'string'
						? responseMessage.trim()
						: 'Registration failed. Please try again.';

				const isGenericServerMessage =
					normalizedMessage.toLowerCase() === 'something went wrong';

				if ((statusCode && statusCode >= 500) || isGenericServerMessage) {
					setSubmitError(
						'Registration service is currently unavailable on server. Please try again later.',
					);
				} else {
					setSubmitError(normalizedMessage);
				}
			} else {
				setSubmitError('Registration failed. Please try again.');
			}

			return false;
		} finally {
			setIsSubmitting(false);
		}
	}, [registerForm]);

	const value = useMemo(
		() => ({
			registerForm,
			updateRegisterForm,
			setRegistrationDocument,
			resetRegisterForm,
			clearSubmitError,
			submitRegisterForm,
			isSubmitting,
			submitError,
		}),
		[
			clearSubmitError,
			isSubmitting,
			registerForm,
			resetRegisterForm,
			setRegistrationDocument,
			submitError,
			submitRegisterForm,
			updateRegisterForm,
		],
	);

	return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
	const context = useContext(MainContext);

	if (!context) {
		throw new Error('useMainContext must be used within MainProvider');
	}

	return context;
};
