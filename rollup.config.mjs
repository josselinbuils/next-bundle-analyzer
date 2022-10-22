import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    exports: 'auto',
    format: 'cjs',
    preserveModules: true,
  },
  external: [
    'next/dist/build/output/log',
    'node:child_process',
    'node:fs',
    'node:path',
    'open',
    'webpack-bundle-analyzer/lib/analyzer',
  ],
  plugins: [
    commonjs(),
    typescript({ tsconfig: './tsconfig.plugin.json' }),
  ],
};
