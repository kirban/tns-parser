import * as fs from 'fs';
import { IParser } from "./interfaces";
import { TnsEntry } from "./types";

// Regular expression to search connection names and connection strings
const re = new RegExp(/^([\w.-]+)\s*=\s*((?:.\s?+|\([^)]*\)\s)*(?=(?:\w+\s*=|$)))/, 'gm');

export class TnsParser implements IParser {

    private entries: TnsEntry[];

    constructor(filePath: string) {
        const content = this.readConfigFile(filePath);

        this.entries = this.parseConfigFile(content);
    }

    readConfigFile(path: string): string | never {
        try {
            return fs.readFileSync(path, 'utf-8');
        } catch (error) {
            throw new Error(`Error reading file: ${error}`);
        }
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