import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { ENV } from '../config';

async function connect() {
  try {
    console.log('ENV.DB_URL: ', ENV.DB_URL);
    mongoose.set('debug', true);
    await mongoose.connect(ENV.DB_URL);
    console.log('db success connected');
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

async function pl(instance, options, next) {
  connect();
  next();
}

export const dbPlugin = fp(pl);
