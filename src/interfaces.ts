import { TnsEntry } from "./types";

export interface IParser {
    getTnsEntry(entries: TnsEntry[], searchKey: string): string | never;
    setTnsEntry(entries: TnsEntry[], aliasName: string, connectionData: string): string | never;
}