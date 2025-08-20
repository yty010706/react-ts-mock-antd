import AutoComplete from './autocomplete';

import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  args: { onSelect: fn() },
  decorators: [
    Story => (
      <div style={{ marginTop: 10, marginLeft: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AutoComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = ['a', 'b', 'c', 'd', 'e', 'f', 'aa', 'bb'];
const handleSearch = (text: string) => {
  return data.filter(item => item.includes(text));
};

export const Default: Story = {
  name: '默认AutoComplete',
  args: {
    onSearch: handleSearch,
  },
};
