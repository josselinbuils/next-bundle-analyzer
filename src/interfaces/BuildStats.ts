import { Group } from './Foamtree';

export interface BuildStats {
  chunks: ChunkGroup[];
  commonChunks?: CommonChunks;
  metadata: Metadata;
  pages?: Page[];
}

export interface ChunkGroup extends Group {
  groups?: ChunkGroup[];
  gzipSize: number;
  inaccurateSizes?: true;
  label: string;
  path?: string;
  statSize: number;
  parsedSize: number;
}

export interface CommonChunks {
  chunks: string[];
  gzipSize: number;
  parsedSize: number;
  statSize: number;
}

export interface Metadata {
  date: string;
  gitCommitId?: string;
  project?: string;
}

export interface Page {
  chunks: string[];
  gzipSize: number;
  label: string;
  parsedSize: number;
  statSize: number;
  totalGzipSize: number;
  totalParsedSize: number;
  totalStatSize: number;
}
