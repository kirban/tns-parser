import { TnsParser } from "./src";

const parser = new TnsParser('./tnsnames.ora')

parser.setTnsEntry('test.google.com', '(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=kapibara.google.com)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=test_service)(INSTANCE_NAME=KAPIBARA)))')

const connectionString = parser.getTnsEntry('test.google.com'); // returns connection string

console.log(connectionString);