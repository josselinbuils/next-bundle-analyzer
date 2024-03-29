import type { FunctionComponent, JSX } from 'preact';

export const ChunkIcon: FunctionComponent<JSX.SVGAttributes> = (props) => (
  <svg width={12} height={12} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fill-rule="evenodd">
      <path
        d="M0 0v11.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75V0H0z"
        fill="#FC6"
      />
      <path d="M0 0s.156 3 1.125 3h9.75C11.845 3 12 0 12 0H0z" fill="#CCA352" />
      <path
        d="M6.75 1.5h-.375L6 2.5l-.375-1H5.25L5.813 3 5.25 4.5h.375L6 3.5l.375 1h.375L6.187 3z"
        fill="#997A3D"
      />
      <circle
        cx=".75"
        cy=".75"
        r="1"
        transform="translate(5.25 3.75)"
        fill="#FFF"
      />
      <circle
        cx=".75"
        cy=".75"
        r="1"
        transform="translate(5.25 .75)"
        fill="#FFF"
      />
    </g>
  </svg>
);
