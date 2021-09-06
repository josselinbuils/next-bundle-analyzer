export type ReportFormat = 'html' | 'json';

export interface InternalOptions extends Required<Options> {
  format: ReportFormat[];
}

export interface Options {
  clientOnly?: boolean;
  enabled?: boolean;
  format?: ReportFormat | ReportFormat[];
  openHtmlReport?: boolean;
  reportDir?: string;
  reportFilename?: string;
}
