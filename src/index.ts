import * as fs from 'fs';
import { IParser } from "./interfaces";
import { TnsEntry } from "./types";

export class TnsParser implements IParser {

    private entries: TnsEntry[];

    constructor(filePath: string, createConfigIfNotExists=false) {
        const content = this.readConfigFile(filePath, createConfigIfNotExists);

        this.entries = this.parseConfigFile(content);
    }

    private readConfigFile(path: string, createFile?: boolean): string | never {
        if (createFile && !fs.existsSync(path)) {
            this.createConfigFile(path);
        }

        try {
            return fs.readFileSync(path, 'utf-8');
        } catch (error) {
            throw new Error(`Error reading file:\n${error}`);
        }
    }

    private createConfigFile(path: string): void | never {
        // when special option is set - create config file if not exists
        console.debug(`Failed to find config at path ${path}\nTrying to create ...`);

        try {
            fs.writeFileSync(path, '', { flag: 'w+' });
        } catch (error) {
            throw new Error(`Failed to create new config file:\n${error}`);
        }
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

    public getTnsEntry(searchKey: string): string | null {
        const lowercasedSearch = searchKey.toLowerCase();
        return this.entries.find((entry) => entry.alias.toLowerCase() === lowercasedSearch)?.connectionString || null;
    }

    public setTnsEntry(aliasName: string, connectionData: string): void | never {
        throw new Error("Method not implemented.");
    }

}