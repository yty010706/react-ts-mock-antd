import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Icon组件的预定义主题类型
 */
type Theme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';

/**
 * Icon组件属性接口
 * @extends FontAwesomeIconProps
 */
export interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  /** 主题颜色 */
  theme?: Theme;
  /** 图标名称 参考 FontAwesome 图标名称*/
  icon: IconProp;
  /** 自定义类名 */
  className?: string;
}

/**
 * Icon组件是基于 FontAwesomeIcon 封装的图标组件，支持主题色配置。
 *
 * ```tsx
 * // 基本用法
 * <Icon icon="check" />
 *
 * // 使用主题色
 * <Icon icon="check" theme="success" />
 * ```
 */
const Icon = ({ theme, icon, className, ...restProps }: IconProps) => {
  const classes = classNames(className, {
    [`icon-${theme}`]: theme,
  });

  return (
    <>
      <FontAwesomeIcon icon={icon} className={classes} {...restProps} />
    </>
  );
};

Icon.displayName = 'Icon';
export default Icon;
