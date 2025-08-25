import { FormContext, FormContextProps } from '@/Contexts/FormContext';
import useForm, { FormState } from '@/hooks/useForm';
import { ValidateError } from 'async-validator';
import { CSSProperties, FormEvent, ReactNode } from 'react';

export type RenderProps = (form: FormState) => ReactNode;

export interface FormProps {
  /**
   * 表单名
   */
  name?: string;
  /**
   * 默认值
   */
  initialValues?: Record<string, any>;
  /**
   * 表单提交且校验成功的回调
   */
  onFinish?: (values: Record<string, any>) => void;
  /**
   * 表单提交但校验失败的回调
   */
  onFinishFailed?: (errors: Record<string, ValidateError[]>) => void;
  /**
   * 子元素
   */
  children?: ReactNode | RenderProps;
  /**
   * 自定义样式
   */
  style?: CSSProperties;
}

/**
 * Form 表单组件
 *
 * 用于创建表单，管理表单字段和验证规则。
 * 支持表单提交、字段验证和错误处理等功能。
 *
 * ```tsx
 * <Form
 *   initialValues={{ username: '', password: '' }}
 *   onFinish={(values) => console.log('提交成功', values)}
 *   onFinishFailed={(errors) => console.log('校验失败', errors)}
 * >
 *   <Form.Item name="username" label="用户名">
 *     <Input />
 *   </Form.Item>
 *   <Form.Item name="password" label="密码">
 *     <Input type="password" />
 *   </Form.Item>
 *   <Button type="submit">提交</Button>
 * </Form>
 * ```
 */
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
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(errors);
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
