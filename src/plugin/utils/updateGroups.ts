import { StatsCompilation } from 'webpack';
import { ChunkGroup } from '../../interfaces/BuildStats';

export function updateGroups(
  groups: ChunkGroup[],
  stats: StatsCompilation
): void {
  groups.forEach((group) => {
    if ((group as any).id !== undefined) {
      delete (group as any).id;
    }

    const issuer = stats.chunks
      ?.map(({ modules }) => modules)
      ?.flat()
      ?.find((m) => m?.name === group.path)?.issuerName;

    if (issuer) {
      group.issuer = issuer;
    }

    if (group.groups !== undefined) {
      updateGroups(group.groups, stats);
    }
  });
}
