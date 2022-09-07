import fastify from 'fastify';
import FastifyCors from 'fastify-cors';
import fastifyFileUploadAwait from 'fastify-file-upload-await';
import fastifyStatic from 'fastify-static';
import path from 'path';
import 'reflect-metadata';
//! .env file in config fle
import { ENV } from '../common/config';
import { dbPlugin } from '../common/db/db';
import { replyDecorator } from '../common/decorators/reply.decorator';
import { authPlugin } from '../common/plugin/authPlugin';
//! plugin
import { routesPlugin } from './router';

const server = fastify({ logger: true });
server.register(FastifyCors, { origin: true });

//! upload files
server.register(fastifyStatic, {
  root: path.join(__dirname, '../../', 'public'),
  // prefix: '/public'
});
server.register(fastifyFileUploadAwait);

//! plugin
server.register(dbPlugin);
server.register(authPlugin);
server.register(replyDecorator);
server.register(routesPlugin);

async function start() {
  try {
    const options = {
      host: ENV.HOST,
      port: ENV.EMPLOYEE_PORT,
    };
    await server.listen(options);
    server.log.info(server.route);
    server.log.info('Started admin successfully');
  } catch (error) {
    console.log('server error : ', error);
    process.exit(1);
  }
}

start();
