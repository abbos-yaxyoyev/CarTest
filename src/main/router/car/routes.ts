import { createCarHandler, deleteByCarIdHandler, getByCarIdHandler, getPagingCarHandler, updateByCarIdHandler } from "../../controller/car/controller";
import { authEmployee } from "../../middleware/authenticate";


export const carRoutes = [
  {
    method: 'POST',
    url: `/car`,
    preValidation: [authEmployee],
    handler: createCarHandler,
  },
  {
    method: 'PUT',
    url: `/car`,
    preValidation: [authEmployee],
    handler: updateByCarIdHandler,
  },
  {
    method: 'DELETE',
    url: `/car/:_id`,
    preValidation: [authEmployee],
    handler: deleteByCarIdHandler,
  },
  {
    method: 'GET',
    url: `/car/:_id`,
    handler: getByCarIdHandler,
  },
  {
    method: 'GET',
    url: `/car`,
    handler: getPagingCarHandler,
  }
];
