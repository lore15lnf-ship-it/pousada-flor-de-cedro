import express from 'express';
import path from 'path';
import { fileURLToPath, filleURLToPath } from 'url';

const app = express();
const__filename = fileURLToPath(import.meta,url);
const__dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

export default app;