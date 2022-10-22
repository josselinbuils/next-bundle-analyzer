import { existsSync, promises as fs } from 'node:fs';
import path from 'node:path';
import logger from 'next/dist/build/output/log';
import { PLUGIN_NAME } from '../constants';
import type { ReportFormat } from '../interfaces/Options';

export async function saveReport(
  reportType: ReportFormat,
  reportPath: string,
  reportContent: string
): Promise<void> {
  const dirname = path.dirname(reportPath);

  if (!existsSync(dirname)) {
    await fs.mkdir(dirname, { recursive: true });
  }

  await fs.writeFile(reportPath, reportContent);

  logger.info(
    `${PLUGIN_NAME} saved ${reportType.toUpperCase()} report to ${path.relative(
      process.cwd(),
      reportPath
    )}`
  );
}
