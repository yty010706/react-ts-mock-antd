import { useImmer, useImmerReducer } from 'use-immer';
import Schema, { RuleItem, ValidateError } from 'async-validator';
import _ from 'lodash';

export interface UseFormProps {
  initialValues?: Record<string, any>;
}

export interface FormFunc {
  addField: (name: string, field: FieldDetails) => void;
  updateField: (name: string, field: Partial<FieldDetails>) => void;
  getFieldValue: (name: string) => any;
  getFieldsValue: () => Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  validateField: (name: string) => void;
  validateFields: () => Promise<ValidateResult>;
  resetFieldsValue: () => void;
}
export type CustomRuleFunc = (formFunc: Partial<FormFunc>) => RuleItem;
export type CustomRuleItem = CustomRuleFunc | RuleItem;

export interface FieldDetails {
  /** 表单Item名称 */
  name: string;
  /** 表单Item的值 */
  value: any;
  /** 表单Item校验规则 */
  rules: CustomRuleItem[];
  /** 表单Item校验结果 */
  isValid: boolean;
  /** 校验失败提示 */
  errors: ValidateError[];
}

export interface FieldState {
  [key: string]: FieldDetails;
}

export interface FormState {
  /** 表单校验结果 */
  isValid: boolean;
  /** 是否正在提交 */
  isSubmitting: boolean;
  /** 表单校验错误 */
  errors: Record<string, ValidateError[]>;
}

export interface FieldAction {
  type: 'addField' | 'updateField';
  name: string;
  value: any;
}

export interface ValidateErrorType {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}

export interface ValidateResult {
  isValid: boolean;
  values: Record<string, any>;
  errors: Record<string, ValidateError[]>;
}

const fieldReducers = (state: FieldState, action: FieldAction): FieldState => {
  switch (action.type) {
    case 'addField':
      return Object.assign(state, { [action.name]: action.value });
    case 'updateField':
      return {
        ...state,
        [action.name]: { ...state[action.name], ...action.value },
      };
    default:
      return state;
  }
};
export default function useForm({ initialValues }: UseFormProps) {
  const [form, setForm] = useImmer<FormState>({
    isValid: false,
    isSubmitting: false,
    errors: {},
  });
  const [fields, dispatch] = useImmerReducer<FieldState, FieldAction>(
    fieldReducers,
    {}
  );

  const addField = (name: string, field: FieldDetails) => {
    dispatch({
      type: 'addField',
      name,
      value: field,
    });
  };

  const updateField = (name: string, field: Partial<FieldDetails>) => {
    dispatch({
      type: 'updateField',
      name,
      value: field,
    });
  };

  const transformRules = (rules: CustomRuleItem[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') return rule(formFunc);
      return rule;
    });
  };

  const validateField = async (name: string) => {
    let isValid = true;
    let errors: ValidateError[] = [];
    const { value, rules } = fields[name];
    const validator = new Schema({
      [name]: transformRules(rules),
    });

    try {
      await validator.validate({ [name]: value });
    } catch (err) {
      errors = (err as ValidateErrorType).errors;
      isValid = false;
    }

    dispatch({
      type: 'updateField',
      name,
      value: { isValid, errors },
    });
  };

  const validateFields = async (): Promise<ValidateResult> => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    const ruleMap = _.mapValues(fields, field => transformRules(field.rules));
    const valueMap = _.mapValues(fields, field => field.value);
    const validator = new Schema(ruleMap);

    setForm(draft => {
      draft.isSubmitting = true;
    });
    try {
      await validator.validate(valueMap);
    } catch (err) {
      errors = (err as ValidateErrorType).fields;
      isValid = false;
    }

    setForm(draft => {
      draft.isSubmitting = false;
      draft.isValid = isValid;
      draft.errors = errors;
    });

    Object.keys(fields).forEach(name => {
      if (errors[name]) {
        dispatch({
          type: 'updateField',
          name,
          value: { isValid: false, errors: errors[name] },
        });
      } else if (fields[name].rules.length > 0) {
        dispatch({
          type: 'updateField',
          name,
          value: { isValid: true, errors: [] },
        });
      }
    });

    return { isValid, errors, values: valueMap };
  };

  const getFieldValue = (name: string) => {
    return fields[name] && fields[name].value;
  };

  const getFieldsValue = () => {
    return _.mapValues(fields, field => field.value);
  };

  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({
        type: 'updateField',
        name,
        value,
      });
    }
  };

  const resetFieldsValue = () => {
    if (initialValues) {
      Object.keys(initialValues).forEach(field => {
        setFieldValue(field, initialValues[field]);
      });
    }
  };

  const formFunc: FormFunc = {
    addField,
    updateField,
    getFieldValue,
    getFieldsValue,
    setFieldValue,
    validateField,
    validateFields,
    resetFieldsValue,
  };

  return [form, fields, formFunc] as const;
}
