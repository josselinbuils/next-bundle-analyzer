import { InternalOptions, Options } from '../interfaces/Options';

export function getInternalOptions({
  clientOnly = true,
  enabled = true,
  format = 'html',
  openHtmlReport = true,
  reportDir = 'analyze',
  reportFilename = 'bundles',
}: Options | undefined = {}): InternalOptions {
  if (!Array.isArray(format)) {
    format = [format];
  }
  return {
    clientOnly,
    enabled,
    format,
    openHtmlReport,
    reportDir,
    reportFilename,
  };
}
