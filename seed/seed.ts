import { execSync } from 'child_process'
import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

type Categories = Record<string, string[]>

export default async (): Promise<void> => {
  try {
    const rootDir: string = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim()
    const metadataDir = join(rootDir, '/assets/metadata')

    const directory: string[] = await readdir(metadataDir, { encoding: 'utf8' })
    const contents: string[] = await Promise.all(
      directory.map((file: string) => readFile(join(metadataDir, file), { encoding: 'utf8' })),
    )

    const categories: Categories = contents
      .reduce((prev: Categories, data: string): Categories => {
        const { title, topics } = JSON.parse(data)

        topics.forEach((topic: string) => {
          const prevRef = prev
          if (!(topic in prev)) {
            prevRef[topic] = []
          }

          prevRef[topic].push(title)
        })

        return prev
      }, {})

    await writeFile(
      join(rootDir, '/assets/categories.json'),
      JSON.stringify(categories, undefined, 2),
    )
  } catch (error: unknown) {
    console.error(error)
  }
}
