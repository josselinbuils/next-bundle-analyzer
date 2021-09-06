import { existsSync, promises as fs } from 'fs';
import logger from 'next/dist/build/output/log';
import path from 'path';
import { PLUGIN_NAME } from '../constants';
import { ReportFormat } from '../interfaces/Options';

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
