import { existsSync, promises as fs } from 'fs';
import open from 'open';
import path from 'path';
import { Compiler } from 'webpack';
import { getViewerData } from 'webpack-bundle-analyzer/lib/analyzer';
import { BuildStats, CommonChunks, Page } from '../interfaces/BuildStats';
import { DATA_PLACEHOLDER, PLUGIN_NAME, TITLE_PLACEHOLDER } from './constants';
import { InternalOptions } from './interfaces/Options';
import { getCommonChunks } from './utils/getCommonChunks';
import { getPages } from './utils/getPages';
import { removeGroupIds } from './utils/removeGroupIds';
import { saveReport } from './utils/saveReport';
import { getMetadata } from './utils/getMetadata';

const templatePath = path.join(__dirname, '../client/client.html');

export class NextBundleAnalyzerPlugin {
  constructor(private readonly options: InternalOptions) {}

  apply(compiler: Compiler) {
    if (!this.options.enabled) {
      return;
    }

    compiler.hooks.done.tapPromise(PLUGIN_NAME, async (stats) => {
      const { outputPath } = compiler;
      const buildManifestPath = path.join(outputPath, 'build-manifest.json');

      const {
        format,
        openHtmlReport,
        reportDir,
        reportFilename,
      } = this.options;

      try {
        const useBuildManifest = existsSync(buildManifestPath);
        const chunks = getViewerData(stats.toJson(), outputPath);
        const metadata = getMetadata();

        removeGroupIds(chunks);

        let commonChunks: CommonChunks | undefined;
        let pages: Page[] | undefined;

        if (useBuildManifest) {
          const buildManifest = require(buildManifestPath);
          commonChunks = getCommonChunks(buildManifest, chunks);
          pages = getPages(buildManifest, chunks, commonChunks);
        }

        const buildStats: BuildStats = {
          chunks,
          commonChunks,
          metadata,
          pages,
        };
        const stringifiedStats = JSON.stringify(buildStats);

        if (format.includes('html')) {
          const reportPath = path.join(
            outputPath,
            reportDir,
            `${reportFilename}.html`
          );
          const template = await fs.readFile(templatePath, 'utf8');
          const title = `${metadata.project ?? 'Bundle'} ${metadata.date}`;
          const content = template
            .replace(DATA_PLACEHOLDER, stringifiedStats)
            .replace(TITLE_PLACEHOLDER, title);

          await saveReport('html', reportPath, content);

          if (openHtmlReport) {
            await open(reportPath);
          }
        }

        if (format.includes('json')) {
          const reportPath = path.join(
            outputPath,
            reportDir,
            `${reportFilename}.json`
          );
          await saveReport('json', reportPath, stringifiedStats);
        }
      } catch (error: any) {
        console.error(error);
        throw new Error(
          `${PLUGIN_NAME}: unable to generate build stats: ${
            error?.stack ?? error
          }`
        );
      }
    });
  }
}
