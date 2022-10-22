import type { StatsCompilation } from 'webpack';
import type { ChunkGroup } from '../../interfaces/BuildStats';

export function updateGroups(
  groups: ChunkGroup[],
  stats: StatsCompilation
): void {
  const modules = stats.chunks?.map((chunk) => chunk.modules)?.flat();

  groups.forEach((group) => {
    if ((group as any).id !== undefined) {
      delete (group as any).id;
    }

    const issuers = modules
      ?.find((module) => module?.name === group.path)
      ?.issuerPath?.map(({ name }) => name)
      ?.filter(Boolean) as string[] | undefined;

    if (issuers && issuers.length > 0) {
      group.issuers = issuers;
    }

    if (group.groups !== undefined) {
      updateGroups(group.groups, stats);
    }
  });
}
