import { ChunkGroup, CommonChunks, Page } from '../../interfaces/BuildStats';
import { PLUGIN_NAME } from '../constants';
import { NextBuildManifest } from '../interfaces/NextBuildManifest';

export function getPages(
  buildManifest: NextBuildManifest,
  chunks: ChunkGroup[],
  commonChunks: CommonChunks
): Page[] {
  const pages: Page[] = [];

  Object.entries(buildManifest.pages).forEach(([label, pageChunks]) => {
    if (label === '/_app') {
      return;
    }

    let gzipSize = 0;
    let parsedSize = 0;
    let statSize = 0;

    pageChunks
      .filter(
        (chunk) =>
          !chunk.endsWith('.css') && !commonChunks.chunks.includes(chunk)
      )
      .forEach((chunk) => {
        const chunkData = chunks.find((c) => c.label === chunk);

        if (chunkData === undefined) {
          throw new Error(
            `${PLUGIN_NAME}: unable to find chunk data for ${chunk}`
          );
        }

        gzipSize += chunkData.gzipSize;
        parsedSize += chunkData.parsedSize;
        statSize += chunkData.statSize;
      });

    pages.push({
      label,
      chunks: pageChunks,
      gzipSize,
      parsedSize,
      statSize,
      totalGzipSize: gzipSize + commonChunks.gzipSize,
      totalParsedSize: parsedSize + commonChunks.parsedSize,
      totalStatSize: statSize + commonChunks.statSize,
    });
  });

  return pages;
}
