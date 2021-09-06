import cn from 'classnames';
import { FunctionComponent, JSX } from 'preact';
import styles from './BackButton.module.scss';

export const BackButton: FunctionComponent<
  JSX.HTMLAttributes<HTMLButtonElement>
> = ({ className, ...forwardedProps }) => (
  <button
    className={cn(styles.button, className)}
    type="button"
    {...forwardedProps}
  >
    Back
  </button>
);
