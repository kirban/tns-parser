import { TnsEntry } from "./types";

export interface IParser {
    getTnsEntry(searchKey: string): string | null;
    setTnsEntry(aliasName: string, connectionData: string): void | never;
}