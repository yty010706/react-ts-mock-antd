import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import Upload, { UploadProps } from './upload';
import axios from 'axios';
import { userEvent } from 'storybook/internal/test';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
jest.mock('../Icon', () => {
  return ({ icon }: any) => {
    return <span>{icon}</span>;
  };
});

const file = new File(['test'], 'test.png', { type: 'image/png' });

const testProps: UploadProps = {
  action: 'fake.url',
  beforeUpload: jest.fn().mockReturnValue(true),
  onProgress: jest.fn(),
  onChange: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

let wrapper: RenderResult;
let input: HTMLInputElement;
let uploadArea: HTMLElement;
let uploadList: HTMLUListElement;
describe('Test Upload', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>点击上传</Upload>);
    input = wrapper.container.querySelector('input') as HTMLInputElement;
    uploadArea = wrapper.queryByText('点击上传') as HTMLElement;
    uploadList = wrapper.container.querySelector(
      '.upload-list'
    ) as HTMLUListElement;
    expect(input).not.toBeVisible();
    expect(uploadArea).toBeInTheDocument();
    expect(uploadList).toBeInTheDocument();
  });

  it('默认Upload测试', async () => {
    mockAxios.post.mockResolvedValue({ data: 'success' });
    mockAxios.delete.mockResolvedValue({ data: 'success' });

    fireEvent.change(input, { target: { files: [file] } });
    expect(testProps.beforeUpload).toHaveBeenCalled();
    expect(wrapper.queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(wrapper.queryByText('check')).toBeInTheDocument();
    });
    expect(wrapper.queryByText('test.png')).toBeInTheDocument();
    expect(testProps.onChange).toHaveBeenCalled();
    expect(testProps.onSuccess).toHaveBeenCalled();

    const uploadFiles = uploadList.querySelectorAll('li');
    userEvent.hover(uploadFiles[0]);
    const closeIcon = uploadFiles[0].querySelector('.close-icon');
    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon!);
    await waitFor(() => {
      expect(testProps.onRemove).toHaveBeenCalled();
    });
    expect(uploadFiles[0]).not.toBeInTheDocument();
  });

  it('拖拽Upload测试', async () => {
    mockAxios.post.mockResolvedValue({ data: 'success' });
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');
    fireEvent.drop(uploadArea, { dataTransfer: { files: [file] } });
    await waitFor(() => {
      expect(wrapper.getByText('test.png')).toBeInTheDocument();
    });
  });
});
