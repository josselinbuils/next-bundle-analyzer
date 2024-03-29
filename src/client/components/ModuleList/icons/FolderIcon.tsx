import type { FunctionComponent, JSX } from 'preact';

export const FolderIcon: FunctionComponent<JSX.SVGAttributes> = (props) => (
  <svg width={13} height={10} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none">
      <path
        d="M11.7 1.333H5.85L4.55 0H1.3C.585 0 0 .6 0 1.333V4h13V2.667c0-.733-.585-1.334-1.3-1.334z"
        fill="#FFA000"
      />
      <path
        d="M11.7 1H1.3C.585 1 0 1.579 0 2.286v6.428C0 9.421.585 10 1.3 10h10.4c.715 0 1.3-.579 1.3-1.286V2.286C13 1.579 12.415 1 11.7 1z"
        fill="#FFCA28"
      />
    </g>
  </svg>
);
