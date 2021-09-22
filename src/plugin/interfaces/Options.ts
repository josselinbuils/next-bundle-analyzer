export type ReportFormat = 'html' | 'json';

export type ObjectFilter =
  | { [key: string]: boolean | ObjectFilter }
  | { [key: string]: boolean | ObjectFilter }[];

export interface Options {
  clientOnly?: boolean;
  enabled?: boolean;
  format?: ReportFormat | ReportFormat[];
  html?: {
    open?: boolean;
  };
  json?: {
    filter?: ObjectFilter | null;
  };
  reportDir?: string;
  reportFilename?: string;
}

export interface InternalOptions extends DeepRequired<Options> {
  format: ReportFormat[];
}
