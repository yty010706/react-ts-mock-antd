import { FormContext } from './form';
import cls from 'classnames';
import React, {
  ChangeEvent,
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { InputProps } from '../Input/input';
import Transition from '../Transition';
import { CustomRuleItem } from '@/hooks/useStore';

export interface FormItemProps {
  /** 表单项名称 */
  name: string;
  /** 表单项label */
  label?: string;
  /** 表单项校验规则 */
  rules?: CustomRuleItem[];
  /** 表单项传值属性名 */
  valuePropName?: string;
  /** 表单项改值事件名 */
  trigger?: string;
  /** 取表单项改值事件对象里的值 */
  getValueFromEvent?: (e: any) => any;
  /** 校验时机 */
  validateTrigger?: 'onChange' | 'onBlur';
  className?: string;
  children?: React.ReactNode;
}

export default function FormItem({
  name = '',
  label,
  rules = [],
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFromEvent = e => e.target.value,
  validateTrigger = 'onBlur',
  className,
  children,
}: FormItemProps) {
  const {
    fields,
    addField,
    updateField,
    validateField,
    initialValues,
    getFieldValue,
  } = useContext(FormContext);
  const validateError = useMemo(() => {
    return fields[name]?.errors.length > 0;
  }, [fields]);

  const rowClasses = cls('form-row', className, {
    'form-row-no-label': !label,
    isRequired: rules.some(rule =>
      typeof rule !== 'function'
        ? rule.required
        : rule({ getFieldValue, validateField }).required
    ),
    isError: validateError,
  });

  useEffect(() => {
    addField(name, {
      name,
      value: initialValues[name] || '',
      rules,
      isValid: false,
      errors: [],
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateField(name, { value: getValueFromEvent(e) });
    if (trigger === validateTrigger) {
      validateField(name);
    }
  };

  const renderChildren = () => {
    const fieldProps: Record<string, any> = {
      [valuePropName]: fields[name]?.value || '',
      [validateTrigger]: () => validateField(name),
      [trigger]: handleChange,
    };
    const childList = React.Children.toArray(children);
    if (childList.length === 0) {
      console.error('FormItem内需要有子组件');
    }
    if (childList.length > 1) {
      console.warn('FormItem内只支持一个子组件，其余会被忽略');
    }
    if (!React.isValidElement(childList[0])) {
      console.error('FormItem的子组件必须是ReactElement');
    }

    const childElement = childList[0] as ReactElement<
      InputProps,
      FunctionComponent<InputProps>
    >;
    return (
      <>
        {React.cloneElement(childElement, {
          ...childElement.props,
          ...fieldProps,
        })}
      </>
    );
  };

  return (
    <div className={rowClasses}>
      {label && (
        <div className="form-item-label">
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="form-item">
        {renderChildren()}
        <Transition in={validateError} timeout={300} animation="zoom-in-top">
          <div className="error-msg">{fields[name]?.errors[0]?.message}</div>
        </Transition>
      </div>
    </div>
  );
}
