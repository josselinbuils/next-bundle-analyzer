import cn from 'classnames';
import type { FunctionComponent, JSX } from 'preact';
import styles from './Checkbox.module.scss';

export const Checkbox: FunctionComponent<
  JSX.HTMLAttributes<HTMLInputElement>
> = ({ children, className, ...forwardedProps }) => (
  <label className={cn(styles.label, className)}>
    <input className={styles.checkbox} type="checkbox" {...forwardedProps} />
    <span className={styles.itemText}>{children}</span>
  </label>
);
