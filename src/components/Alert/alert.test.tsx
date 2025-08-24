import Alert from './alert';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { AlertProps } from './alert';

const titleAndDespProps: AlertProps = {
  title: '标题',
  description: '描述',
};

const typeProps: AlertProps = {
  type: 'success',
};

const closeProps: AlertProps = {
  onClose: jest.fn(),
  closable: true,
};

describe('Test Alert', () => {
  it('Default Alert渲染测试', () => {
    const wrapper = render(<Alert />);
    const alert = wrapper.getByTestId('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('alert-default');

    const title = alert.querySelector('.alert-title');
    expect(title?.textContent).toEqual('this is title');
    expect(title).not.toHaveClass('border-title');
  });

  it('不同类型Alert渲染测试', () => {
    const wrapper = render(<Alert {...typeProps} />);
    const alert = wrapper.getByTestId('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass(`alert-${typeProps.type}`);
  });

  it('Alert标题与描述渲染测试', () => {
    const wrapper = render(<Alert {...titleAndDespProps} />);
    const alert = wrapper.getByTestId('alert');
    expect(alert).toBeInTheDocument();

    const title = alert.querySelector('.alert-title');
    expect(title?.textContent).toEqual(titleAndDespProps.title);
    expect(title).toHaveClass('border-title');

    const desp = alert.querySelector('.alert-description');
    expect(desp?.textContent).toEqual(titleAndDespProps.description);
  });

  it('Alert可关闭测试', async () => {
    const wrapper = render(<Alert {...closeProps} />);
    const alert = wrapper.getByTestId('alert');
    expect(alert).toBeInTheDocument();

    const closeIcon = alert.querySelector('.alert-close');
    fireEvent.click(closeIcon!);
    expect(closeProps.onClose).toHaveBeenCalled();
    await waitFor(() => {
      expect(alert).not.toBeInTheDocument();
    });
  });

  it('Alert无关闭Icon测试', () => {
    const wrapper = render(<Alert closable={false} />);
    const alert = wrapper.getByTestId('alert');
    expect(alert).toBeInTheDocument();

    expect(alert.querySelector('.alert-close')).not.toBeInTheDocument();
  });
});
