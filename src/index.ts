import * as fs from 'fs'
import type { IParser } from './interfaces'
import type { TnsEntry } from './types'

export class TnsParser implements IParser {
  private readonly filePath: string
  private readonly entries: TnsEntry[]

  constructor (filePath: string, createConfigIfNotExists = false) {
    const content = this.readConfigFile(filePath, createConfigIfNotExists)
    this.filePath = filePath

    this.entries = this.parseConfigFile(content)
  }

  private readConfigFile (path: string, createFile: boolean): string | never {
    if (createFile && !fs.existsSync(path)) {
      this.createConfigFile(path)
    }

    try {
      return fs.readFileSync(path, 'utf-8')
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error reading file:\n${JSON.stringify(error)}`)
      }
      throw error
    }
  }

  private createConfigFile (path: string): void | never {
    // when special option is set - create config file if not exists
    console.debug(`Failed to find config at path ${path}\nTrying to create ...`)

    try {
      fs.writeFileSync(path, '', { flag: 'w+' })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create new config file:\n${JSON.stringify(error)}`)
      }
      throw error
    }
  }

  private parseConfigFile (data: string): TnsEntry[] {
    // Regular expression to search connection names and connection strings
    const re = /^([\w.-]+)\s*=\s*((?:.\s?|\([^)]*\)\s)*(?=(?:\w+\s*=|$)))/gmi
    const spacesRe = /\s/gm
    const matches = Array.from(data.matchAll(re))

    return matches.map((match) => {
      return {
        alias: match[1],
        connectionString: match[2].trim().replaceAll(spacesRe, '')
      }
    })
  }

  public getTnsEntry (searchKey: string): string | null {
    const lowercasedSearch = searchKey.toLowerCase()
    return this.entries.find((entry) => entry.alias.toLowerCase() === lowercasedSearch)?.connectionString ?? null
  }

  public setTnsEntry (newEntry: TnsEntry): void | never {
    const entryExists = this.entries.some((entry) => entry.alias === newEntry.alias)

    if (entryExists) {
      throw new Error('Entry with this alias already exists! Try to pick another one.')
    }

    try {
      fs.writeFileSync(this.filePath, `\n${newEntry.alias} = ${newEntry.connectionString}`, { flag: 'a' })
    } catch (error) {
      throw new Error('Failed appending config file!')
    }

    this.entries.push(newEntry)
  }
}
