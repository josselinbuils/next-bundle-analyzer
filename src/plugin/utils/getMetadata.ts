import childProcess from 'child_process';
import path from 'path';
import { Metadata } from '../../interfaces/BuildStats';

export function getMetadata(): Metadata {
  const date = new Date().toISOString();
  const metadata: Metadata = { date };

  try {
    metadata.gitCommitId = childProcess
      .execSync('git rev-parse HEAD')
      .toString()
      .trim();
  } catch {
    // Ignored
  }

  try {
    metadata.project = require(path.join(process.cwd(), 'package.json')).name;
  } catch {
    // Ignored
  }

  return metadata;
}
