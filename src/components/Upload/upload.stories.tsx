import { Meta, StoryObj } from '@storybook/react-vite';
import Upload from './upload';
import { fn } from 'storybook/test';
import Button from '../Button';
import Icon from '../Icon';

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
    onRemove: fn(),
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
  args: {
    children: (
      <Button btnType="default" icon={<Icon icon="upload" />}>
        上传文件
      </Button>
    ),
  },
};

export const DragUpload: Story = {
  name: '拖拽上传',
  args: {
    drag: true,
    children: (
      <>
        <Icon icon="upload" size="3x" theme="primary" />
        <span>拖拽文件以上传</span>
      </>
    ),
  },
};
