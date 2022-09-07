import { createEmployeeHandler, deleteByEmployeeIdHandler, getByEmployeeAccountHandler, getPagingEmployeeHandler, loginEmployeeHandler, updateEmployeeAccountIdHandler } from "../../controller/employee/controller";
import { authEmployee } from "../../middleware/authenticate";


export const employeeRoutes = [
  {
    method: 'POST',
    url: `/employee`,
    preValidation: [authEmployee],
    handler: createEmployeeHandler,
  },
  {
    method: 'POST',
    url: `/employee/login`,
    handler: loginEmployeeHandler,
  },
  {
    method: 'PUT',
    url: `/employee`,
    preValidation: [authEmployee],
    handler: updateEmployeeAccountIdHandler,
  },
  {
    method: 'DELETE',
    url: `/employee/:_id`,
    handler: deleteByEmployeeIdHandler,
  },
  {
    method: 'GET',
    url: `/employee/account`,
    preValidation: [authEmployee],
    handler: getByEmployeeAccountHandler,
  },
  {
    method: 'GET',
    url: `/employee`,
    preValidation: [authEmployee],
    handler: getPagingEmployeeHandler,
  }
];
