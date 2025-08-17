import Input from './input';

import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  args: { onChange: fn() },
  // decorators: [
  //   Story => (
  //     <div style={{ display: 'flex', justifyContent: 'center' }}>
  //       <Story />
  //     </div>
  //   ),
  // ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认Input',
};

export const DiffSizeInput: Story = {
  name: '不同尺寸Input',
  args: {
    size: 'sm',
  },
};

export const Disabled: Story = {
  name: '禁用状态Input',
  args: {
    disabled: true,
  },
};

export const IconInput: Story = {
  name: '带有Icon的Input',
  args: {
    icon: 'search',
  },
};

export const PrefixInput: Story = {
  name: '带有前缀的Input',
  args: {
    prefix: 'www.',
  },
};
