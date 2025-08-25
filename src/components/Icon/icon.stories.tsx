import Icon from './icon';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Icon 图标',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      description: '图标主题',
    },
    icon: {
      control: 'text',
      description: '图标名称，参考 FontAwesome 图标名称',
    },
    spin: {
      control: 'boolean',
      description: '是否旋转',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  name: '基本用法',
  args: {
    icon: 'coffee',
  },
};

export const WithTheme: Story = {
  name: '主题图标',
  args: {
    icon: 'check-circle',
    theme: 'success',
  },
};

export const AllThemes: Story = {
  name: '所有主题',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon icon="check-circle" theme="primary" />
      <Icon icon="check-circle" theme="secondary" />
      <Icon icon="check-circle" theme="success" />
      <Icon icon="info-circle" theme="info" />
      <Icon icon="exclamation-circle" theme="warning" />
      <Icon icon="times-circle" theme="danger" />
    </div>
  ),
};

export const SpinIcon: Story = {
  name: '旋转图标',
  args: {
    icon: 'spinner',
    spin: true,
  },
};

export const IconSizes: Story = {
  name: '不同尺寸',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon icon="coffee" size="xs" />
      <Icon icon="coffee" size="sm" />
      <Icon icon="coffee" size="lg" />
      <Icon icon="coffee" size="2x" />
      <Icon icon="coffee" size="3x" />
    </div>
  ),
};
