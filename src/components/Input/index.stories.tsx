import Input from './input';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react-vite';
import Icon from '../Icon';

const meta = {
  title: 'Input 输入框',
  component: Input,
  tags: ['autodocs'],
  args: { onChange: fn() },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'lg'],
      description: '输入框尺寸',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    icon: {
      control: { type: 'radio' },
      options: [undefined, 'search', 'user', 'lock'],
      description: '输入框图标',
    },
  },
  decorators: [
    Story => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认输入框',
  args: {
    placeholder: '请输入内容',
  },
};

export const Large: Story = {
  name: '大尺寸输入框',
  args: {
    size: 'lg',
    placeholder: '大尺寸输入框',
  },
};

export const Small: Story = {
  name: '小尺寸输入框',
  args: {
    size: 'sm',
    placeholder: '小尺寸输入框',
  },
};

export const Disabled: Story = {
  name: '禁用状态',
  args: {
    disabled: true,
    placeholder: '禁用状态',
  },
};

export const WithIcon: Story = {
  name: '带图标输入框',
  args: {
    icon: 'search',
    placeholder: '带图标输入框',
  },
};

export const DifferentIcons: Story = {
  name: '不同图标输入框',
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Input {...args} icon="user" placeholder="用户名" />
      <Input {...args} icon="lock" placeholder="密码" />
      <Input {...args} icon="search" placeholder="搜索" />
    </div>
  ),
};

export const PrefixSuffix: Story = {
  name: '前后缀输入框',
  args: {
    prefix: 'https://',
    suffix: '.com',
    placeholder: '网址',
  },
};

export const CustomPrefixSuffix: Story = {
  name: '自定义前后缀',
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Input {...args} prefix={<Icon icon="user" />} placeholder="用户名" />
      <Input
        {...args}
        suffix={<span>.example.com</span>}
        placeholder="邮箱前缀"
      />
    </div>
  ),
};

export const PasswordInput: Story = {
  name: '密码输入框',
  args: {
    type: 'password',
    icon: 'lock',
    placeholder: '请输入密码',
  },
};
