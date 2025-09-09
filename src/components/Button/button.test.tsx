import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';
import Icon from '../Icon';

const testProps: ButtonProps = {
  btnType: 'danger',
  size: 'small',
  className: 'test-class',
};

const testLinkProps: ButtonProps = {
  btnType: 'link',
  href: 'https://www.baidu.com',
};

describe('Test Button', () => {
  it('Default Button渲染测试', () => {
    const clickFn = jest.fn();
    const wrapper = render(
      <Button onClick={clickFn} data-testid="default-button">
        Hello World
      </Button>
    );
    const button = wrapper.getByTestId('default-button');

    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('btn btn-default');
    expect(button.textContent).toBe('Hello World');
    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalled();
  });

  it('不同类型和尺寸的Button渲染测试', () => {
    const wrapper = render(
      <Button data-testid="diff-type-button" {...testProps}>
        Hello World
      </Button>
    );

    const button = wrapper.getByTestId('diff-type-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      `btn-${testProps.btnType} test-class btn-${testProps.size}`
    );
  });

  it('Link Button渲染测试', () => {
    const clickFn = jest.fn();
    const wrapper = render(
      <Button {...testLinkProps} onClick={clickFn}>
        Hello World
      </Button>
    );

    const button = wrapper.getByTestId('link-button');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('A');
    expect(button).toHaveClass('btn-link');
    fireEvent.click(button);
    expect(clickFn).toHaveBeenCalled();
  });

  it('Disabled Button渲染测试', () => {
    const clickFn = jest.fn();
    const wrapper = render(
      <Button data-testid="disabled-button" disabled onClick={clickFn}>
        Hello World
      </Button>
    );

    const button = wrapper.getByTestId('disabled-button') as HTMLButtonElement;
    expect(button).toBeInTheDocument();
    expect(button.disabled).toBeTruthy();
    fireEvent.click(button);
    expect(clickFn).not.toHaveBeenCalled();
  });

  it('带Icon组件的Button渲染测试', () => {
    const wrapper = render(
      <Button
        data-testid="icon-button"
        btnType="primary"
        icon={<Icon icon="check" data-testid="check-icon" />}
      >
        Confirm
      </Button>
    );

    const button = wrapper.getByTestId('icon-button');
    const icon = wrapper.getByTestId('check-icon');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn-primary');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg'); // FontAwesome图标渲染为svg元素
    expect(button.textContent).toBe('Confirm');
  });

  it('仅包含Icon组件的Button渲染测试', () => {
    const wrapper = render(
      <Button
        data-testid="icon-only-button"
        btnType="default"
        icon={<Icon icon="star" theme="warning" data-testid="star-icon" />}
      />
    );

    const button = wrapper.getByTestId('icon-only-button');
    const icon = wrapper.getByTestId('star-icon');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn-default');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('icon-warning'); // 验证主题类名
  });
});
