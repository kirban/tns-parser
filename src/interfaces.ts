import { TnsEntry } from "./types";

export interface IParser {
    getTnsEntry(searchKey: string): string | never;
    setTnsEntry(aliasName: string, connectionData: string): void | never;
}