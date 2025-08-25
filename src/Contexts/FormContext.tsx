import useForm, { FieldState } from '@/hooks/useForm';
import { createContext } from 'react';

export interface FormContextProps {
  fields: FieldState;
  formFunc: ReturnType<typeof useForm>[2];
  initialValues: Record<string, any>;
}

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);
