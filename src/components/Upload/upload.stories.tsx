import { Meta, StoryObj } from '@storybook/react';
import Upload from './upload';
import { fn } from 'storybook/test';

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    return Promise.reject('不支持上传大小超过50kb的文件');
  }
  return true;
};

const meta = {
  title: 'Upload',
  component: Upload,
  tags: ['autodocs'],
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    beforeUpload: checkFileSize,
    onProgress: fn(),
    onSuccess: fn(),
    onError: fn(),
    onChange: fn(),
  },
  decorators: [
    Story => (
      <div style={{ marginTop: 10, marginLeft: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Upload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '默认',
};
