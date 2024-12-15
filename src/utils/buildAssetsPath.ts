import { join, normalize } from 'path'

export default (target: string): string => join(
  normalize(join(__dirname, '../')),
  'assets',
  target,
)
