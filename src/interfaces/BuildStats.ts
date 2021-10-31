import { Group } from './Foamtree';

export interface BuildStats {
  chunks: ChunkGroup[];
  commonChunks?: CommonChunk[];
  metadata: Metadata;
  pages?: Page[];
}

export interface ChunkGroup extends Group {
  groups?: ChunkGroup[];
  gzipSize: number;
  inaccurateSizes?: true;
  isAsset?: boolean;
  issuers?: string[];
  label: string;
  parsedSize: number;
  path?: string;
  statSize: number;
  sharedByPages?: 'all' | string[];
}

export interface CommonChunk {
  chunk: string;
  sharedByPages?: 'all' | string[];
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
