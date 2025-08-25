import { Meta, StoryObj } from '@storybook/react-vite';
import Upload from './upload';
import { fn } from 'storybook/test';
import Button from '../Button';
import Icon from '../Icon';

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024 / 1024) > 2) {
    return Promise.reject('不支持上传大小超过2mb的文件');
  }
  return true;
};

const meta = {
  title: 'Upload 上传',
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

export const MultipleUpload: Story = {
  name: '多文件上传',
  args: {
    multiple: true,
    children: (
      <Button btnType="primary" icon={<Icon icon="upload" />}>
        上传多个文件
      </Button>
    ),
  },
};

export const WithAccept: Story = {
  name: '限制文件类型',
  args: {
    accept: '.jpg,.jpeg,.png',
    children: (
      <Button btnType="default" icon={<Icon icon="image" />}>
        上传图片
      </Button>
    ),
  },
};

export const WithDefaultFiles: Story = {
  name: '带默认文件列表',
  args: {
    defaultFileList: [
      {
        uid: '1',
        name: 'example.png',
        size: 1024,
        status: 'success',
        percentage: 100,
      },
      {
        uid: '2',
        name: 'document.pdf',
        size: 2048,
        status: 'uploading',
        percentage: 50,
      },
    ],
    children: (
      <Button btnType="default" icon={<Icon icon="upload" />}>
        上传文件
      </Button>
    ),
  },
};

export const CustomData: Story = {
  name: '自定义请求数据',
  args: {
    data: {
      userId: '123',
      category: 'avatar',
    },
    name: 'avatar',
    children: (
      <Button btnType="primary" icon={<Icon icon="user" />}>
        上传头像
      </Button>
    ),
  },
};
