import type { TnsEntry } from './types'

export interface IParser {
  getTnsEntry: (searchKey: string) => string | null
  setTnsEntry: (newEntry: TnsEntry) => void | never
}
