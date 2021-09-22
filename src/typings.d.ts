declare module '@carrotsearch/foamtree';
declare module 'webpack-bundle-analyzer/lib/analyzer';
declare module '*.scss';

type DeepRequired<T> = T extends {}
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : Required<T>;
