import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-bottom'
  | 'zoom-in-left'
  | 'zoom-in-right'
  | 'zoom-out-right';
export type TransitionProps = CSSTransitionProps<HTMLElement> & {
  animation?: AnimationName;
  children: React.ReactNode;
};
const Transition: FC<TransitionProps> = props => {
  const { animation, classNames, children, wrapper, ...restProps } = props;
  const nodeRef = useRef(null);

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
