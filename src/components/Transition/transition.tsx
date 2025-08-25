import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right'
  | 'zoom-out-top';

export type TransitionProps = CSSTransitionProps<HTMLElement> & {
  /** 动画类型 */
  animation?: AnimationName;
  /** 动画包裹的子元素 */
  children: React.ReactNode;
};

/**
 * Transition 组件是基于 react-transition-group 的 CSSTransition 封装的动画组件。
 * 提供了几种预设的动画效果。
 *
 * ```tsx
 * // 基本用法
 * <Transition in={show} animation="zoom-in-top">
 *   <div>需要动画的元素</div>
 * </Transition>
 *
 * // 自定义动画持续时间
 * <Transition in={show} animation="zoom-in-top" timeout={500}>
 *   <div>动画持续时间为500ms</div>
 * </Transition>
 *
 * // 使用自定义CSS类名
 * <Transition in={show} classNames="fade">
 *   <div>使用fade动画</div>
 * </Transition>
 * ```
 */
const Transition: FC<TransitionProps> = ({
  animation,
  classNames,
  children,
  ...restProps
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      nodeRef={nodeRef}
      {...restProps}
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  );
};

export default Transition;
