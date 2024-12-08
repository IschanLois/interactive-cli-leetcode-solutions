import { execSync } from 'child_process'
import { join } from 'path'

export default (target: string): string => join(
  execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim(),
  'assets',
  target,
)
