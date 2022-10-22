import type { InternalOptions, Options } from '../interfaces/Options';

export function getInternalOptions({
  clientOnly = true,
  enabled = true,
  format = 'html',
  html = {},
  json = {},
  reportDir = 'analyze',
  reportFilename = 'bundles',
}: Options | undefined = {}): InternalOptions {
  const { open = true } = html;
  const { filter = null } = json;

  if (!Array.isArray(format)) {
    format = [format];
  }
  return {
    clientOnly,
    enabled,
    format,
    html: { open },
    json: { filter },
    reportDir,
    reportFilename,
  };
}
