import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    exports: 'auto',
    format: 'cjs',
  },
  external: [
    'child_process',
    'fs',
    'next/dist/build/output/log',
    'open',
    'path',
    'webpack-bundle-analyzer/lib/analyzer',
  ],
  preserveModules: true,
  plugins: [
    commonjs(),
    typescript({ tsconfig: path.join(__dirname, './tsconfig.plugin.json') }),
  ],
};
