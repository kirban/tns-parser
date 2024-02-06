import * as fs from 'fs';
import { IParser } from "./interfaces";
import { TnsEntry } from "./types";

export class TnsParser implements IParser {

    private entries: TnsEntry[];

    constructor(filePath: string) {
        const content = this.readConfigFile(filePath);

        this.entries = this.parseConfigFile(content);
    }

    private readConfigFile(path: string): string | never {
        try {
            return fs.readFileSync(path, 'utf-8');
        } catch (error) {
            throw new Error(`Error reading file: ${error}`);
        }
    }

    private createConfigFile(path: string): void | never {
        // when special option is set - create config file if not exists
        throw new Error("Method not implemented.");
    }

    private parseConfigFile(data: string): TnsEntry[] {
        // Regular expression to search connection names and connection strings
        const re = new RegExp('^([\\w.-]+)\\s*=\\s*((?:.\\s?|\\([^)]*\\)\\s)*(?=(?:\\w+\\s*=|$)))', 'gmi');
        const spacesRe = new RegExp('\\s', 'gm');
        const matches = Array.from(data.matchAll(re));

        return matches.map((match) => {
            console.log()
            return {
                alias: match[1],
                connectionString: match[2].trim().replaceAll(spacesRe, ''),
            }
        })
    }

    public getTnsEntry(searchKey: string): string | never {
        throw new Error("Method not implemented.");
    }

    public setTnsEntry(aliasName: string, connectionData: string): void | never {
        throw new Error("Method not implemented.");
    }

}