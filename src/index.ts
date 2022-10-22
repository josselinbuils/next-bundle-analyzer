import { NextBundleAnalyzerPlugin } from './plugin/NextBundleAnalyzerPlugin';
import type { Options } from './plugin/interfaces/Options';
import { getInternalOptions } from './plugin/utils/getInternalOptions';

export type {
  BuildStats,
  ChunkGroup,
  CommonChunk,
  Page,
} from './interfaces/BuildStats';

export default function withNextBundleAnalyzer(options: Options) {
  const internalOptions = getInternalOptions(options);
  const { clientOnly, enabled, reportDir } = internalOptions;
  let { reportFilename } = internalOptions;

  return (nextConfig: any = {}) => ({
    ...nextConfig,
    webpack(webpackConfig: any, webpackOptions: any) {
      const { isServer } = webpackOptions;

      if ((enabled && !isServer) || !clientOnly) {
        if (!clientOnly) {
          reportFilename = isServer
            ? `${reportFilename}-server`
            : `${reportFilename}-client`;
        }

        webpackConfig.plugins.push(
          new NextBundleAnalyzerPlugin({
            ...internalOptions,
            clientOnly,
            enabled,
            reportDir: isServer ? `../../${reportDir}` : `./${reportDir}`,
            reportFilename,
          })
        );
      }

      return typeof nextConfig.webpack === 'function'
        ? nextConfig.webpack(webpackConfig, webpackOptions)
        : webpackConfig;
    },
  });
}
