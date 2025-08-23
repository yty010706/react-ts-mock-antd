import useStore, { FieldState } from '@/hooks/useStore';
import { createContext, CSSProperties, ReactNode } from 'react';

export interface FormProps {
  /**表单名 */
  name?: string;
  /** 默认值 */
  initialValues?: Record<string, any>;
  children?: ReactNode;
  style?: CSSProperties;
}

export interface FormContextProps {
  fields: FieldState;
  addField: ReturnType<typeof useStore>[2];
  updateField: ReturnType<typeof useStore>[3];
  validateField: ReturnType<typeof useStore>[4];
  initialValues: Record<string, any>;
  getFieldValue: ReturnType<typeof useStore>[5];
}

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);

export default function Form({
  name,
  initialValues = {},
  children,
  style,
}: FormProps) {
  const [form, fields, addField, updateField, validateField, getFieldValue] =
    useStore();
  console.log(fields);
  const passedContext: FormContextProps = {
    fields,
    addField,
    updateField,
    validateField,
    initialValues,
    getFieldValue,
  };

  return (
    <form name={name} className="form" style={style}>
      <FormContext value={passedContext}>{children}</FormContext>
    </form>
  );
}
