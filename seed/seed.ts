import { execSync } from 'child_process'
import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default async (): Promise<void> => {
  try {
    const rootDir: string = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim()
    const metadataDir = join(rootDir, '/assets/metadata')

    const directory: string[] = await readdir(metadataDir, { encoding: 'utf8' })
    const contents: Record<string, string>[] = await Promise.all(
      directory
        .map((file: string): Promise<Record<string, string>> => new Promise((resolve) => {
          readFile(join(metadataDir, file), { encoding: 'utf8' })
            .then((content: string) => { resolve({ [`${file.split('.')[0]}.cpp`]: content }) })
        })),
    )

    const categories: Record<string, string[]> = {}

    contents.forEach((data: Record<string, string>) => {
      const [file, category] = Object.entries(data).flat()
      const { topics } = JSON.parse(category)

      topics.forEach((topic: string) => {
        if (!(topic in categories)) {
          categories[topic] = []
        }

        categories[topic].push(file)
      })
    })

    await writeFile(
      join(rootDir, '/assets/categories.json'),
      JSON.stringify(categories, undefined, 2),
    )
  } catch (error: unknown) {
    console.error(error)
  }
}
