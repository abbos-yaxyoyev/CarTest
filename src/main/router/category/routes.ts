import { createCategoryHandler, deleteByCategoryIdHandler, getByCategoryIdHandler, getPagingCategoryHandler, getPagingMarkaHandler, updateByCategoryIdHandler } from "../../controller/category/controller";
import { authEmployee } from "../../middleware/authenticate";


export const categoryRoutes = [
  {
    method: 'POST',
    url: `/category`,
    preValidation: [authEmployee],
    handler: createCategoryHandler,
  },
  {
    method: 'PUT',
    url: `/category`,
    preValidation: [authEmployee],
    handler: updateByCategoryIdHandler,
  },
  {
    method: 'DELETE',
    url: `/category/:_id`,
    preValidation: [authEmployee],
    handler: deleteByCategoryIdHandler,
  },
  {
    method: 'GET',
    url: `/category/:_id`,
    handler: getByCategoryIdHandler,
  },
  {
    method: 'GET',
    url: `/category`,
    handler: getPagingCategoryHandler,
  },
  {
    method: 'GET',
    url: `/category/marka`,
    handler: getPagingMarkaHandler,
  }
];
