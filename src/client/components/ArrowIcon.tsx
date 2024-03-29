import type { FunctionComponent } from 'preact';

interface Props {
  orientation: 'left' | 'right';
}

export const ArrowIcon: FunctionComponent<Props> = ({ orientation }) => (
  <svg
    height="10"
    style={{ transform: orientation === 'left' ? `rotate(180deg)` : '' }}
    viewBox="0 0 7 13"
    width="6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M.822 12.811a.445.445 0 0 1-.322.133.456.456 0 0 1-.322-.778L5.844 6.5.178.833A.456.456 0 0 1 .822.19l5.99 5.989a.456.456 0 0 1 0 .644l-5.99 5.99z" />
  </svg>
);
