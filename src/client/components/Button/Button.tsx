import cn from 'classnames';
import type { FunctionComponent, JSX } from 'preact';
import styles from './Button.module.scss';

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  toggle?: boolean;
}

export const Button: FunctionComponent<Props> = ({
  active = false,
  toggle = false,
  className,
  children,
  ...forwardedProps
}) => (
  <button
    className={cn(styles.button, className, {
      [styles.active]: active,
      [styles.toggle]: toggle,
    })}
    type="button"
    {...forwardedProps}
  >
    {children}
  </button>
);
