import {
  BuildStats,
  ChunkGroup,
  CommonChunk,
} from '../../interfaces/BuildStats';
import { MAIN_SIZE_PROPERTY } from '../constants';
import { ClientGroup } from '../interfaces/ClientGroup';
import { ClientData } from '../interfaces/ClientState';

let id: number;

export function computeTreeData(buildStats: BuildStats): ClientData {
  const { chunks, commonChunks, pages } = buildStats;

  if (!commonChunks || !pages) {
    return { groups: formatGroups(chunks) };
  }

  const otherGroups = chunks.filter(
    ({ label }) =>
      !commonChunks.some((commonChunk) => commonChunk.chunk === label) &&
      pages.every((page) => !page.chunks.includes(label))
  );

  const otherGroup: ChunkGroup = {
    label: 'others',
    groups: otherGroups,
    gzipSize: 0,
    parsedSize: 0,
    statSize: 0,
  };

  otherGroups.forEach((group) => {
    otherGroup.gzipSize += group.gzipSize;
    otherGroup.parsedSize += group.parsedSize;
    otherGroup.statSize += group.statSize;
  });

  id = 0;

  return {
    groups: formatGroups([
      ...pages.map((page) => {
        const pageGroup: ChunkGroup = {
          label: 'page',
          groups: chunks.filter(
            ({ label }) =>
              page.chunks.includes(label) &&
              !commonChunks.some((commonChunk) => commonChunk.chunk === label)
          ),
          gzipSize: page.gzipSize,
          parsedSize: page.parsedSize,
          statSize: page.statSize,
        };

        return {
          ...page,
          groups: [getSharedGroup(chunks, commonChunks, page.label), pageGroup],
          gzipSize: page.totalGzipSize,
          parsedSize: page.totalParsedSize,
          statSize: page.totalStatSize,
        };
      }),
      otherGroup,
    ]),
  };
}

function addSharedByPagesProperty(
  groups: ChunkGroup[],
  commonChunk: CommonChunk
): void {
  groups.forEach((group) => {
    group.sharedByPages = commonChunk.sharedByPages;

    if (group.groups !== undefined) {
      addSharedByPagesProperty(group.groups, commonChunk);
    }
  });
}

function getSharedGroup(
  chunks: ChunkGroup[],
  commonChunks: CommonChunk[],
  pageLabel: string
): ChunkGroup {
  const sharedByAllPagesGroup: ChunkGroup = {
    groups: chunks.filter(({ label }) =>
      commonChunks.some(
        (commonChunk) =>
          commonChunk.chunk === label && commonChunk.sharedByPages === 'all'
      )
    ),
    label: 'by all pages',
    gzipSize: 0,
    parsedSize: 0,
    statSize: 0,
  };

  const sharedByMultiplePagesGroup: ChunkGroup = {
    groups: chunks
      .map((chunk) => ({
        chunk,
        commonChunk: commonChunks.find(
          (commonChunk) =>
            commonChunk.chunk === chunk.label &&
            Array.isArray(commonChunk.sharedByPages)
        ),
      }))
      .filter(
        ({ commonChunk }) =>
          !!commonChunk &&
          (commonChunk.sharedByPages as string[]).includes(pageLabel)
      )
      .map(({ chunk, commonChunk }) => {
        addSharedByPagesProperty([chunk], commonChunk as CommonChunk);
        return chunk;
      }),
    label: 'by multiple pages',
    gzipSize: 0,
    parsedSize: 0,
    statSize: 0,
  };

  const sharedGroup: ChunkGroup = {
    label: 'shared',
    groups: [sharedByAllPagesGroup, sharedByMultiplePagesGroup],
    gzipSize: 0,
    parsedSize: 0,
    statSize: 0,
  };

  (sharedGroup.groups as ChunkGroup[]).forEach((group) => {
    (group.groups as ChunkGroup[]).forEach((g) => {
      sharedGroup.gzipSize += g.gzipSize;
      sharedGroup.parsedSize += g.parsedSize;
      sharedGroup.statSize += g.statSize;

      group.gzipSize += g.gzipSize;
      group.parsedSize += g.parsedSize;
      group.statSize += g.statSize;
    });
  });

  return sharedGroup;
}

/**
 * Makes sure that duplicated groups have different references to prevent
 * navigation issues and add weight properties.
 */
function formatGroups(groups: ChunkGroup[]): ClientGroup[] {
  return groups.map((group) => {
    id += 1;

    return {
      ...group,
      groups: group.groups ? formatGroups(group.groups) : undefined,
      id: id.toString(),
      weight: group[MAIN_SIZE_PROPERTY],
    };
  });
}
