import Button from './button';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react-vite';
import Icon from '../Icon';

const meta = {
  title: 'Button 按钮',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() },
  argTypes: {
    btnType: {
      control: {
        type: 'select',
      },
      description: '按钮类型',
      options: ['default', 'primary', 'danger', 'dashed'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'normal', 'large'],
    },
  },
  decorators: [
    Story => (
      <div style={{ textAlign: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认按钮',
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  name: '各类型按钮',
  args: {
    btnType: 'primary',
    children: 'Primary Button',
  },
};

export const Link: Story = {
  name: '链接按钮',
  args: {
    btnType: 'link',
    children: 'Link Button',
    href: 'https://www.baidu.com',
  },
};

export const Small: Story = {
  name: '各尺寸按钮',
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const WithIcon: Story = {
  name: '带图标按钮',
  args: {
    btnType: 'primary',
    children: 'Confirm',
    icon: <Icon icon="check" />,
  },
};

export const Disabled: Story = {
  name: '禁用按钮',
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const BlockButton: Story = {
  name: '块级按钮',
  args: {
    btnType: 'primary',
    children: 'Block Button',
    style: { display: 'block', width: '100%' },
  },
};

export const IconWithTheme: Story = {
  name: '带主题色图标按钮',
  args: {
    btnType: 'default',
    children: 'Success',
    icon: <Icon icon="check" theme="success" />,
  },
};

export const DifferentIconSizes: Story = {
  name: '不同尺寸图标按钮',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button btnType="primary" icon={<Icon icon="coffee" size="xs" />}>
        XS Icon
      </Button>
      <Button btnType="primary" icon={<Icon icon="coffee" size="lg" />}>
        LG Icon
      </Button>
      <Button btnType="primary" icon={<Icon icon="coffee" size="2x" />}>
        2x Icon
      </Button>
    </div>
  ),
};

export const IconOnlyButton: Story = {
  name: '仅图标按钮',
  args: {
    btnType: 'primary',
    icon: <Icon icon="star" />,
    style: { width: '40px', height: '40px', padding: 0 },
  },
};
