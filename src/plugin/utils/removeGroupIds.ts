import { ChunkGroup } from '../../interfaces/BuildStats';

export function removeGroupIds(groups: ChunkGroup[]): void {
  groups.forEach((group) => {
    if ((group as any).id !== undefined) {
      delete (group as any).id;
    }
    if (group.groups !== undefined) {
      removeGroupIds(group.groups);
    }
  });
}
