import 'reflect-metadata';
import express from 'express';

import './database';

import uploadConfig from './config/upload';

import routes from './routes';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.listen(3333, () => console.log('Server listening on port 3333...'));
