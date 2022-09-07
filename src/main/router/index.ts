import fp from 'fastify-plugin';
//! routesPlugin
import { carRoutes } from './car/routes';
import { categoryRoutes } from './category/routes';
import { employeeRoutes } from './employee/routes';
import { roleRoutes } from './role/routes';
import { uploadFileRoutes } from './upload/routes';


const routes = [
  ...carRoutes,
  ...roleRoutes,
  ...categoryRoutes,
  ...employeeRoutes,
  ...uploadFileRoutes,
];

export async function pl(instance, _, next) {
  try {
    routes.map((route) => instance.route(route));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  next();
}

export const routesPlugin = fp(pl);
