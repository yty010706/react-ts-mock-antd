import AutoComplete, { OptionType } from './autocomplete';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import Mock from 'mockjs';

interface ValueProp {
  name: string;
  age: number;
}

const data: ValueProp[] = Mock.mock({
  'data|5-10': [
    {
      name: '@string("alphaNumeric",5,10)',
      'age|1-100': 1,
    },
  ],
}).data;
const generateOptions = (data: ValueProp[]) => {
  const options: OptionType[] = data.map(item => ({
    value: item.name,
    label: item.name,
  }));
  return options;
};

const handleSearch = (query: string) => {
  return Promise.resolve(
    generateOptions(data.filter(item => item.name.includes(query)))
  );
};
// 搜索逻辑
const handleSearchAsync = (query: string) => {
  // return Promise.resolve(
  //   generateOptions(data.filter(item => item.name.includes(query)))
  // );
  return fetch('/api/userList')
    .then(res => res.json())
    .then(res => {
      return generateOptions(
        res.filter((item: ValueProp) => item.name.includes(query))
      );
    });
};

// option定制化渲染
const renderOptions = (item: OptionType) => {
  const option = data.find(i => i.name === item.value)!;
  return (
    <div style={{ position: 'relative' }}>
      <div>
        姓名：<strong>{`${option.name}`}</strong>
      </div>
      <div>{`年龄：${option.age}`}</div>
    </div>
  );
};

const meta = {
  title: 'AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  args: {
    options: generateOptions(data),
    onSelect: fn(),
    onSearch: handleSearch,
  },
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

export const Default: Story = {
  name: '默认',
};

export const CustomRenderOption: Story = {
  name: '自定义选项渲染方式',
  args: {
    renderOptions,
  },
};

export const AsyncOption: Story = {
  name: '异步获取选项',
  args: {
    onSearch: handleSearchAsync,
  },
};
