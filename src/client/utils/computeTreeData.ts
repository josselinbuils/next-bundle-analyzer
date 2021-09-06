import { BuildStats, ChunkGroup } from '../../interfaces/BuildStats';
import { ClientGroup } from '../interfaces/ClientGroup';
import { ClientData } from '../interfaces/ClientState';

const SORT_PROPERTY = 'parsedSize';
let id: number;

export function computeTreeData(buildStats: BuildStats): ClientData {
  const { chunks, commonChunks, pages } = buildStats;

  if (!commonChunks || !pages) {
    return { groups: formatGroups(chunks) };
  }

  const commonGroup: ChunkGroup = {
    label: 'shared',
    groups: chunks.filter(({ label }) => commonChunks.chunks.includes(label)),
    gzipSize: commonChunks.gzipSize,
    parsedSize: commonChunks.parsedSize,
    statSize: commonChunks.statSize,
  };

  const otherGroups = chunks.filter(({ label }) =>
    pages.every((page) => !page.chunks.includes(label))
  );
  const otherGroup: ChunkGroup = {
    label: 'others',
    groups: otherGroups,
    gzipSize: 0,
    parsedSize: 0,
    statSize: 0,
  };

  otherGroups.forEach(({ gzipSize, parsedSize, statSize }) => {
    otherGroup.gzipSize += gzipSize;
    otherGroup.parsedSize += parsedSize;
    otherGroup.statSize += statSize;
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
              !commonChunks.chunks.includes(label)
          ),
          gzipSize: page.gzipSize,
          parsedSize: page.parsedSize,
          statSize: page.statSize,
        };

        return {
          ...page,
          groups: [commonGroup, pageGroup],
          gzipSize: page.totalGzipSize,
          parsedSize: page.totalParsedSize,
          statSize: page.totalStatSize,
        };
      }),
      otherGroup,
    ]),
  };
}

/**
 * Makes sure that duplicated groups have different references to prevent
 * navigation issues and add weight properties.
 */
function formatGroups(groups: ChunkGroup[]): ClientGroup[] {
  return groups.map((group) => {
    id += 1;

    const clientGroup: ClientGroup = {
      ...group,
      id: id.toString(),
      weight: group[SORT_PROPERTY],
    };

    if (clientGroup.groups) {
      clientGroup.groups = formatGroups(clientGroup.groups);
    }
    return clientGroup;
  });
}
