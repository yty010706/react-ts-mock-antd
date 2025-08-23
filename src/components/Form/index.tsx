import Form, { FormProps } from './form';
import FormItem, { FormItemProps } from './formItem';

interface FormComponent extends React.FC<FormProps> {
  Item: React.FC<FormItemProps>;
}

const TransFrom = Form as FormComponent;
TransFrom.Item = FormItem;

export default TransFrom;
