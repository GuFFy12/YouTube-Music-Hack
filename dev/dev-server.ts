import * as fs from 'fs';
import { readFileSync } from 'fs';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';

const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

createServer((request: IncomingMessage, response: ServerResponse) => {
	response.end(fs.readFileSync(`./dist/${packageJson.name}.user.js`));
}).listen(9000);
