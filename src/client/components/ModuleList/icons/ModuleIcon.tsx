import type { FunctionComponent, JSX } from 'preact';

export const ModuleIcon: FunctionComponent<JSX.SVGAttributes> = (props) => (
  <svg width={11} height={13} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M1.625 0A1.63 1.63 0 0 0 0 1.625v9.75A1.63 1.63 0 0 0 1.625 13h7.583a1.63 1.63 0 0 0 1.625-1.625V3.567L7.266 0H1.625zm0 1.083H6.5v3.25h3.25v7.042a.535.535 0 0 1-.542.542H1.625a.535.535 0 0 1-.542-.542v-9.75c0-.305.237-.542.542-.542zm5.958.766L8.984 3.25h-1.4v-1.4zM3.25 6.5v1.083h4.333V6.5H3.25zm0 2.167V9.75H6.5V8.667H3.25z"
      fill-opacity=".403"
    />
  </svg>
);
