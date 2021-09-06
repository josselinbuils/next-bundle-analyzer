import { ChunkGroup } from '../../interfaces/BuildStats';

export interface ClientGroup extends ChunkGroup {
  id: string;
  weight: number;
}
