import Alert from './alert';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react-vite';
import Icon from '../Icon';

const meta = {
  title: 'Alert 警告提示',
  component: Alert,
  tags: ['autodocs'],
  args: { onClose: fn() },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'default', 'danger', 'warning'],
      description: '警告类型',
    },
    closable: {
      control: 'boolean',
      description: '是否可关闭',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认警告提示',
  args: {
    title: '默认警告提示',
    description: '这是一段关于警告提示的描述信息',
  },
};

export const Success: Story = {
  name: '各类型提示',
  args: {
    title: '提示',
    description: '这是一段提示的描述信息',
    type: 'success',
  },
};

export const WithoutDescription: Story = {
  name: '无描述警告提示',
  args: {
    title: '只显示标题的警告提示',
    type: 'success',
  },
};

export const Closable: Story = {
  name: '可关闭警告提示',
  args: {
    title: '可关闭的警告提示',
    description: '这是一个可以关闭的警告提示',
    closable: true,
  },
};

export const NotClosable: Story = {
  name: '不可关闭警告提示',
  args: {
    title: '不可关闭的警告提示',
    description: '这是一个不能关闭的警告提示',
    closable: false,
  },
};

export const CustomCloseIcon: Story = {
  name: '自定义关闭图标',
  args: {
    title: '自定义关闭图标的警告提示',
    description: '这是一个使用自定义关闭图标的警告提示',
    closable: true,
    closeIcon: <Icon icon="info-circle" />,
  },
};
