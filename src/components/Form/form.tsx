import useForm, { FieldState, FormState } from '@/hooks/useForm';
import { ValidateError } from 'async-validator';
import { createContext, CSSProperties, FormEvent, ReactNode } from 'react';

export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
  /**表单名 */
  name?: string;
  /** 默认值 */
  initialValues?: Record<string, any>;
  /** 表单提交且校验成功的回调 */
  onFinish?: (values: Record<string, any>) => void;
  /** 表单提交但校验失败的回调 */
  onFinishFailed?: (errors: Record<string, ValidateError[]>) => void;
  children?: ReactNode | RenderProps;
  style?: CSSProperties;
}

export interface FormContextProps {
  fields: FieldState;
  formFunc: ReturnType<typeof useForm>[2];
  initialValues: Record<string, any>;
}

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);

export default function Form({
  name,
  initialValues = {},
  onFinish,
  onFinishFailed,
  children,
  style,
}: FormProps) {
  const [form, fields, formFunc] = useForm(initialValues);
  const { validateFields } = formFunc;
  const passedContext: FormContextProps = {
    fields,
    formFunc,
    initialValues,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, values, errors } = await validateFields();
    if (isValid) {
      onFinish && onFinish(values);
    } else {
      onFinishFailed && onFinishFailed(errors);
    }
  };

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(form);
    }
    return children;
  };

  return (
    <form name={name} className="form" style={style} onSubmit={handleSubmit}>
      <FormContext value={passedContext}>{renderChildren()}</FormContext>
    </form>
  );
}
