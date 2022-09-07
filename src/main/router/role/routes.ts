import { createRoleHandler, deleteRoleHandler, getByRoleIdHandler, getPagingRoleHandler, updateByRoleIdHandler } from '../../controller/role/controller';
import { authEmployee } from '../../middleware/authenticate';


export const roleRoutes = [
  {
    method: 'POST',
    url: `/role`,
    preValidation: [authEmployee],
    handler: createRoleHandler,
  },
  {
    method: 'PUT',
    url: `/role`,
    preValidation: [authEmployee],
    handler: updateByRoleIdHandler,
  },
  {
    method: 'DELETE',
    url: `/role/:_id`,
    preValidation: [authEmployee],
    handler: deleteRoleHandler,
  },
  {
    method: 'GET',
    url: `/role/:_id`,
    preValidation: [authEmployee],
    handler: getByRoleIdHandler,
  },
  {
    method: 'GET',
    url: `/role`,
    preValidation: [authEmployee],
    handler: getPagingRoleHandler,
  }
];
