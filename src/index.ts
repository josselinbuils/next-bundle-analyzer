import { Options } from './plugin/interfaces/Options';
import { NextBundleAnalyzerPlugin } from './plugin/NextBundleAnalyzerPlugin';
import { getInternalOptions } from './plugin/utils/getInternalOptions';

export type {
  BuildStats,
  ChunkGroup,
  CommonChunks,
  Page,
} from './interfaces/BuildStats';

export default function withNextBundleAnalyzer(options: Options) {
  const { clientOnly, enabled, ...otherOptions } = getInternalOptions(options);

  return (nextConfig: any = {}) => ({
    ...nextConfig,
    webpack(webpackConfig: any, webpackOptions: any) {
      const { isServer } = webpackOptions;

      if ((enabled && !isServer) || !clientOnly) {
        webpackConfig.plugins.push(
          new NextBundleAnalyzerPlugin({
            ...otherOptions,
            clientOnly,
            enabled,
            reportDir: isServer ? '../../analyze' : './analyze',
            reportFilename: isServer ? 'server' : 'client',
          })
        );
      }

      return typeof nextConfig.webpack === 'function'
        ? nextConfig.webpack(webpackConfig, webpackOptions)
        : webpackConfig;
    },
  });
}
