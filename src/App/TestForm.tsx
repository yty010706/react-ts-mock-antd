import Button from '@/components/Button';
import Form from '@/components/Form';
import Input from '@/components/Input';

const Item = Form.Item;
export default function TestForm() {
  return (
    <Form style={{ margin: '50px auto', maxWidth: 500 }}>
      <Item
        label="用户名"
        name="userName"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 6, max: 16, message: '长度需在6到16之间' },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="密码"
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          {
            pattern: /^[a-zA-Z0-9]{6,16}$/,
            message: '请输入6-16位密码,包含字母或数字',
          },
          ({ validateField }) => {
            return {
              asyncValidator(_, value) {
                validateField('confirm-pwd');
                return Promise.resolve();
              },
            };
          },
        ]}
      >
        <Input type="password" />
      </Item>
      <Item
        label="确认密码"
        name="confirm-pwd"
        rules={[
          { required: true, message: '请输入确认密码' },
          {
            pattern: /^[a-zA-Z0-9]{6,16}$/,
            message: '请输入6-16位密码,包含字母或数字',
          },
          ({ getFieldValue }) => {
            const pwd = getFieldValue('password');
            return {
              asyncValidator(_, value) {
                return new Promise((resolve, reject) => {
                  if (pwd !== value) {
                    reject('密码不相等');
                  }
                  resolve();
                });
              },
            };
          },
        ]}
      >
        <Input type="password" />
      </Item>
      <div className="button-group" style={{ textAlign: 'center' }}>
        <Button btnType="primary">登录</Button>
        <Button style={{ marginLeft: 30 }}>取消</Button>
      </div>
    </Form>
  );
}
