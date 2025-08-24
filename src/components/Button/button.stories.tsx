import Button from './button';

import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Button',
  component: Button,
  // tags: ['autodocs'],
  args: { onClick: fn() },
  argTypes: {
    btnType: {
      control: {
        type: 'select',
      },
      description: '按钮类型',
      options: ['default', 'primary', 'danger', 'link'],
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
  args: {
    children: 'Button',
  },
};
export const Primary: Story = {
  args: {
    btnType: 'primary',
    children: 'Primary Button',
  },
};

export const Danger: Story = {
  args: {
    btnType: 'danger',
    children: 'Danger Button',
  },
};

export const Link: Story = {
  args: {
    btnType: 'link',
    children: 'Link Button',
    href: 'https://www.baidu.com',
  },
};

export const Dashed: Story = {
  args: {
    btnType: 'dashed',
    children: 'Dashed Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};
