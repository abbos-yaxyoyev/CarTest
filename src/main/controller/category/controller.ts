import { Types } from 'mongoose';
import { Roles } from '../../../common/constants/roles';
import { CategoryException } from '../../../common/db/models/category/exceptions';
import { categoryService } from '../../../common/service/category/category.service';
import { roleService } from '../../../common/service/employee/role/role.service';
import { PagingDto } from '../../../common/validation/dtos';
import { CategoryDto, CategoryDtoGroup } from '../../../common/validation/dtos/category/category.dto';
import { validateIt } from '../../../common/validation/validate';

export async function createCategoryHandler(request, reply) {
  try {

    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, CategoryDto, [CategoryDtoGroup.CREATE]);

    const result = await categoryService.create(data);

    return reply.success(result._id);

  } catch (e) {

    throw CategoryException.UnknownError(e);

  }
}

export async function updateByCategoryIdHandler(request, reply) {
  try {
    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, CategoryDto, [CategoryDtoGroup.UPDATE]);

    const result = await categoryService.updateOne(data._id, data, { new: true });

    return reply.success(result._id);

  } catch (e) {

    throw CategoryException.UnknownError(e);

  }
}

export async function getByCategoryIdHandler(request, reply) {
  try {

    const data = await validateIt(request.params, CategoryDto, [CategoryDtoGroup.GET_BY_ID]);

    const result = await categoryService.getCategoryById(data._id);

    if (!result) {
      throw CategoryException.NotFound(data._id);
    }

    return reply.success(result);

  } catch (e) {
    throw CategoryException.UnknownError(e);
  }
}

export async function getPagingCategoryHandler(request, reply) {

  const data = await validateIt(request.query, PagingDto, [CategoryDtoGroup.PAGENATION]);

  const result = await categoryService.getCategoryPaging(data);

  return reply.success(result);

}

export async function getPagingMarkaHandler(request, reply) {

  const data = await validateIt(request.query, PagingDto, [CategoryDtoGroup.PAGENATION]);

  const result = await categoryService.getMarkaPaging(data);

  return reply.success(result);

}

export async function deleteByCategoryIdHandler(request, reply) {
  try {
    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.params, CategoryDto, [CategoryDtoGroup.DELETE]);

    const query = {
      isDeleted: false,
      _id: new Types.ObjectId(data._id),
      cretedBy: request.employee._id
    };

    await categoryService.updateOneByQuery(
      query,
      { ...request.body, isDeleted: true, deletedAt: Date.now() },
      { new: true },
    );

    return reply.success(data._id);

  } catch (e) {
    console.log('error category delete: ', e);
    throw CategoryException.UnknownError(e);
  }
}
