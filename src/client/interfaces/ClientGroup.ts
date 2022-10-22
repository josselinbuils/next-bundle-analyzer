import type { ChunkGroup } from '../../interfaces/BuildStats';

export interface ClientGroup extends ChunkGroup {
  groups?: ClientGroup[];
  id: string;
  weight: number;
}
