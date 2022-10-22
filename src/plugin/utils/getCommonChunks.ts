import type { CommonChunk } from '../../interfaces/BuildStats';
import type { NextBuildManifest } from '../interfaces/NextBuildManifest';

// @see https://github.com/vercel/next.js/blob/canary/packages/next/build/utils.ts
export function getCommonChunks(
  buildManifest: NextBuildManifest
): CommonChunk[] {
  const chunksMap = new Map<string, string[]>();
  let pageCount = 0;

  Object.entries(buildManifest.pages).forEach(([pageLabel, pageChunks]) => {
    pageCount += 1;

    pageChunks
      .filter((chunk) => !chunk.endsWith('.css'))
      .forEach((chunk) => {
        chunksMap.set(chunk, [...(chunksMap.get(chunk) || []), pageLabel]);
      });
  });

  return [...chunksMap.entries()]
    .filter(([, pageLabels]) => pageLabels.length > 1)
    .map(([chunk, pageLabels]) => ({
      chunk,
      sharedByPages: pageLabels.length >= pageCount ? 'all' : pageLabels,
    }));
}
