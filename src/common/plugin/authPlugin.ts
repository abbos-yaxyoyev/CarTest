import fp from 'fastify-plugin';
import { ENV } from '../config';
import fastifyJWT from 'fastify-jwt';

async function auth(instance, options, next) {
  instance.register(fastifyJWT, {
    secret: ENV.JWT_SECRET,
    sign: {
      expiresIn: ENV.JWT_EXPIRE,
    },
  });

  instance.addHook('onRequest', function (request, reply, done) {
    request.instance = instance;
    request.lang = request.headers['language'] || 'uz';
    console.log('language: ', request.lang);
    done();
  });

  next();
}

export const authPlugin = fp(auth);

export function jwtSign(request, params) {
  return request.instance.jwt.sign(params);
}
