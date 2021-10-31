import { ChunkGroup, CommonChunk, Page } from '../../interfaces/BuildStats';
import { PLUGIN_NAME } from '../constants';
import { NextBuildManifest } from '../interfaces/NextBuildManifest';

export function getPages(
  buildManifest: NextBuildManifest,
  chunks: ChunkGroup[],
  commonChunks: CommonChunk[]
): Page[] {
  const pages: Page[] = [];

  Object.entries(buildManifest.pages).forEach(([label, pageChunks]) => {
    if (label === '/_app') {
      return;
    }

    let totalGzipSize = 0;
    let totalParsedSize = 0;
    let totalStatSize = 0;
    let gzipSize = 0;
    let parsedSize = 0;
    let statSize = 0;

    pageChunks
      .filter((chunk) => !chunk.endsWith('.css'))
      .forEach((chunk) => {
        const chunkData = chunks.find((c) => c.label === chunk);

        if (chunkData === undefined) {
          throw new Error(
            `${PLUGIN_NAME}: unable to find chunk data for ${chunk}`
          );
        }

        totalGzipSize += chunkData.gzipSize;
        totalParsedSize += chunkData.parsedSize;
        totalStatSize += chunkData.statSize;
      });

    pageChunks
      .filter(
        (chunk) =>
          !chunk.endsWith('.css') &&
          !commonChunks.some((commonChunk) => commonChunk.chunk === chunk)
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
      totalGzipSize,
      totalParsedSize,
      totalStatSize,
    });
  });

  return pages;
}
