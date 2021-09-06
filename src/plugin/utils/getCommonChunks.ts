import { ChunkGroup, CommonChunks } from '../../interfaces/BuildStats';
import { PLUGIN_NAME } from '../constants';
import { NextBuildManifest } from '../interfaces/NextBuildManifest';

// @see https://github.com/vercel/next.js/blob/canary/packages/next/build/utils.ts
export function getCommonChunks(
  buildManifest: NextBuildManifest,
  chunks: ChunkGroup[]
): CommonChunks {
  const chunksMap = new Map();
  let expectedCount = 0;
  let gzipSize = 0;
  let parsedSize = 0;
  let statSize = 0;

  Object.keys(buildManifest.pages).forEach((key) => {
    expectedCount += 1;

    buildManifest.pages[key]
      .filter((chunk) => !chunk.endsWith('.css'))
      .forEach((chunk) => {
        if (key === '/_app') {
          chunksMap.set(chunk, Infinity);
        } else if (chunksMap.has(chunk)) {
          chunksMap.set(chunk, chunksMap.get(chunk) + 1);
        } else {
          chunksMap.set(chunk, 1);
        }
      });
  });

  const commonChunks = [...chunksMap.entries()]
    .filter(([, count]) => count === expectedCount || count === Infinity)
    .map(([chunk]) => chunk);

  commonChunks.forEach((chunk) => {
    const chunkData = chunks.find((c) => c.label === chunk);

    if (chunkData === undefined) {
      throw new Error(`${PLUGIN_NAME}: unable to find chunk data for ${chunk}`);
    }

    gzipSize += chunkData.gzipSize;
    parsedSize += chunkData.parsedSize;
    statSize += chunkData.statSize;
  });

  return {
    chunks: commonChunks,
    gzipSize,
    parsedSize,
    statSize,
  };
}
