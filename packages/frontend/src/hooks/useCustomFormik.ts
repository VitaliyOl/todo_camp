import { useState } from 'react';
import { useFormik, FormikConfig, FormikHelpers } from 'formik';
import { isAxiosError } from '~/shared/utils/axiosUtils';
import { ErrorResponse } from '~/shared/services/types';

interface UseCustomFormikReturn<Values> {
  formik: ReturnType<typeof useFormik<Values>>;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

export const useCustomFormik = <Values extends Record<string, any>>(
  config: FormikConfig<Values>
): UseCustomFormikReturn<Values> => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (values: Values, formikHelpers: FormikHelpers<Values>) => {
    try {
      await config.onSubmit(values, formikHelpers);
      setErrorMessage(null);
    } catch (error: unknown) {
      if (isAxiosError<ErrorResponse>(error) && error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const formik = useFormik<Values>({ ...config, onSubmit });

  return {
    formik,
    errorMessage,
    setErrorMessage,
  };
};
