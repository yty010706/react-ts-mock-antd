import Transition from './transition';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
  title: 'Transition 动画',
  component: Transition,
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: { type: 'radio' },
      options: [
        'zoom-in-top',
        'zoom-in-bottom',
        'zoom-in-left',
        'zoom-in-right',
        'zoom-out-top',
      ],
      description: '预定义动画',
    },
    in: {
      control: 'boolean',
      description: '控制显示/隐藏',
    },
    timeout: {
      control: 'number',
      description: '动画持续时间',
    },
    classNames: {
      control: 'text',
      type: 'string',
      description: '自定义CSS类名',
    },
    unmountOnExit: {
      control: 'boolean',
      type: 'boolean',
      description: '退出时卸载组件',
    },
    appear: {
      control: 'boolean',
      type: 'boolean',
      description: '初始挂载时是否执行动画',
    },
  },
} satisfies Meta<typeof Transition>;

export default meta;

type Story = StoryObj<typeof Transition>;

/**
 * 基础用法 - 展示Transition组件的基本使用方法
 */
export const Default: Story = {
  name: '基础用法',
  args: {
    in: true,
    timeout: 300,
    animation: 'zoom-in-top',
    children: (
      <div
        style={{ padding: '20px', background: '#f0f0f0', borderRadius: '4px' }}
      >
        这是一个带动画的元素
      </div>
    ),
  },
};

/**
 * 不同方向的zoom-in动画合集
 * 展示了从不同方向进入的zoom-in动画效果
 */
export const ZoomInAnimations: Story = {
  name: 'Zoom-in动画合集',
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Transition {...args} animation="zoom-in-top">
          <div
            style={{
              padding: '10px',
              background: '#e6f7ff',
              border: '1px solid #91d5ff',
              borderRadius: '4px',
            }}
          >
            zoom-in-top
          </div>
        </Transition>
        <Transition {...args} animation="zoom-in-bottom">
          <div
            style={{
              padding: '10px',
              background: '#e6f7ff',
              border: '1px solid #91d5ff',
              borderRadius: '4px',
            }}
          >
            zoom-in-bottom
          </div>
        </Transition>
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Transition {...args} animation="zoom-in-left">
          <div
            style={{
              padding: '10px',
              background: '#e6f7ff',
              border: '1px solid #91d5ff',
              borderRadius: '4px',
            }}
          >
            zoom-in-left
          </div>
        </Transition>
        <Transition {...args} animation="zoom-in-right">
          <div
            style={{
              padding: '10px',
              background: '#e6f7ff',
              border: '1px solid #91d5ff',
              borderRadius: '4px',
            }}
          >
            zoom-in-right
          </div>
        </Transition>
      </div>
    </div>
  ),
  args: {
    timeout: 300,
  },
};

/**
 * zoom-out动画效果展示
 */
export const ZoomOutAnimation: Story = {
  name: 'Zoom-out动画',
  args: {
    in: true,
    timeout: 300,
    animation: 'zoom-out-top',
    children: (
      <div
        style={{
          padding: '20px',
          background: '#fffbe6',
          border: '1px solid #ffe58f',
          borderRadius: '4px',
        }}
      >
        zoom-out-top 动画
      </div>
    ),
  },
};

/**
 * 交互式动画演示
 * 通过按钮控制元素的显示/隐藏，演示动画的进入和退出效果
 */
export const InteractiveTransition: Story = {
  name: '交互式动画',
  render: args => {
    const [show, setShow] = useState(true);

    return (
      <div>
        <button
          onClick={() => setShow(!show)}
          style={{
            marginBottom: '20px',
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {show ? '隐藏' : '显示'}
        </button>
        <div>
          <Transition {...args} in={show}>
            <div
              style={{
                padding: '20px',
                background: '#f6ffed',
                border: '1px solid #b7eb8f',
                borderRadius: '4px',
              }}
            >
              可交互的动画元素，点击按钮查看进入/退出动画效果
            </div>
          </Transition>
        </div>
      </div>
    );
  },
  args: {
    timeout: 300,
    animation: 'zoom-in-top',
    unmountOnExit: true,
  },
};

/**
 * 自定义CSS类名动画
 * 演示如何通过classNames属性使用自定义CSS类名实现动画效果
 */
export const CustomClassNames: Story = {
  name: '自定义CSS类名',
  args: {
    in: true,
    timeout: 500,
    classNames: 'custom-fade',
    children: (
      <div
        style={{
          padding: '20px',
          background: '#fff0f6',
          border: '1px solid #ffadd2',
          borderRadius: '4px',
        }}
      >
        使用自定义CSS类名的动画
      </div>
    ),
  },
};
