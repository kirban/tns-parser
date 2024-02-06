import { IParser } from "./interfaces";
import { TnsEntry } from "./types";

// Regular expression to search connection names and connection strings
const re = new RegExp(/^([\w.-]+)\s*=\s*((?:.\s?+|\([^)]*\)\s)*(?=(?:\w+\s*=|$)))/, 'gm');

export class TnsParser implements IParser {

    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    readConfigFile(path: string): string | never {
        throw new Error("Method not implemented.");
    }

    parseConfigFile(data: string): TnsEntry[] {
        throw new Error("Method not implemented.");
    }

    getTnsEntry(entries: TnsEntry[], searchKey: string): string {
        throw new Error("Method not implemented.");
    }

    setTnsEntry(entries: TnsEntry[], aliasName: string, connectionData: string): string {
        throw new Error("Method not implemented.");
    }

}