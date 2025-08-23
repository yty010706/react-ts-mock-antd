import { useImmer, useImmerReducer } from 'use-immer';
import Schema, { RuleItem, ValidateError } from 'async-validator';

export interface formFuncs {
  getFieldValue: (name: string) => any;
  validateField: (name: string) => void;
}
export type CustomRuleFunc = ({
  getFieldValue,
  validateField,
}: formFuncs) => RuleItem;
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
}

export interface FieldAction {
  type: 'addField' | 'updateField';
  name: string;
  value: any;
}

export interface FormStore {
  /** 表单数据 */
  fields: FieldState;
  /** 表单状态 */
  form: FormState;
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
export default function useStore() {
  const [form, setForm] = useImmer<FormState>({ isValid: false });
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

  const validateField = (name: string) => {
    const { value, rules } = fields[name];
    const customRules = rules.map(rule => {
      if (typeof rule === 'function')
        return rule({ getFieldValue, validateField });
      return rule;
    });
    const validator = new Schema({ [name]: customRules });
    validator
      .validate({ [name]: value })
      .then(_ => {
        dispatch({
          type: 'updateField',
          name,
          value: { isValid: true, errors: [] },
        });
      })
      .catch(err => {
        dispatch({
          type: 'updateField',
          name,
          value: { isValid: false, errors: err.errors },
        });
      });
  };

  const getFieldValue = (name: string) => {
    return fields[name] && fields[name].value;
  };

  return [
    form,
    fields,
    addField,
    updateField,
    validateField,
    getFieldValue,
  ] as const;
}
