import Form from './index';
import Input from '../Input/input';
import Button from '../Button/button';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Form 表单',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '表单名称',
    },
    initialValues: {
      control: 'object',
      description: '表单初始值',
    },
  },
  decorators: [
    Story => (
      <div style={{ margin: '50px auto', maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {
  name: '基础表单',
  render: args => (
    <Form
      {...args}
      onFinish={values => alert(`提交成功: ${JSON.stringify(values)}`)}
      onFinishFailed={errors => console.log('校验失败:', errors)}
    >
      <Form.Item name="username" label="用户名">
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Button type="submit" btnType="primary">
          提交
        </Button>
        <Button style={{ transform: 'translateX(100px)' }} type="button">
          取消
        </Button>
      </div>
    </Form>
  ),
  args: {
    initialValues: {
      username: '',
      password: '',
    },
  },
};

export const FormWithValidation: Story = {
  name: '带验证的表单',
  render: args => (
    <Form
      {...args}
      onFinish={values => alert(`提交成功: ${JSON.stringify(values)}`)}
      onFinishFailed={errors => console.log('校验失败:', errors)}
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6位' },
        ]}
      >
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Button type="submit" btnType="primary">
          提交
        </Button>
        <Button style={{ transform: 'translateX(100px)' }} type="button">
          取消
        </Button>
      </div>
    </Form>
  ),
  args: {
    initialValues: {
      email: '',
      password: '',
    },
  },
};

export const FormWithCustomValidation: Story = {
  name: '自定义验证表单',
  render: args => (
    <Form
      {...args}
      onFinish={values => alert(`提交成功: ${JSON.stringify(values)}`)}
      onFinishFailed={errors => console.log('校验失败:', errors)}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名至少3个字符' },
        ]}
      >
        <Input placeholder="请输入至少3个字符的用户名" />
      </Form.Item>
      <Form.Item
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
              asyncValidator() {
                validateField!('confirm-pwd');
                return Promise.resolve();
              },
            };
          },
        ]}
      >
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => {
            const pwd = getFieldValue!('password');
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
        <Input type="password" placeholder="请再次输入密码" />
      </Form.Item>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Button type="submit" btnType="primary">
          提交
        </Button>
        <Button style={{ transform: 'translateX(100px)' }} type="button">
          取消
        </Button>
      </div>
    </Form>
  ),
  args: {
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  },
};
