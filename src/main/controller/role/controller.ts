import { Types } from 'mongoose';
import { Roles } from '../../../common/constants/roles';
import { RoleException } from '../../../common/db/models/employee/role/exceptions';
import { roleService } from '../../../common/service/employee/role/role.service';
import { PagingDto } from '../../../common/validation/dtos';
import { RoleDto, RoleDtoGroup } from '../../../common/validation/dtos/employee/role/role.dto';
import { validateIt } from '../../../common/validation/validate';

export async function createRoleHandler(request, reply) {
  try {

    // await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, RoleDto, [RoleDtoGroup.CREATE]);

    const result = await roleService.create(data);

    return reply.success(result._id);

  } catch (e) {

    throw RoleException.UnknownError(e);

  }
}

export async function updateByRoleIdHandler(request, reply) {
  try {

    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, RoleDto, [RoleDtoGroup.UPDATE]);

    await roleService.updateOne(data._id, data, { new: true });

    return reply.success(data._id);

  } catch (e) {

    throw RoleException.UnknownError(e);

  }
}

export async function getByRoleIdHandler(request, reply) {
  try {

    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.params, RoleDto, [RoleDtoGroup.GET_BY_ID]);

    const result = await roleService.getById(data._id);

    if (!result) {
      throw RoleException.NotFound(data._id);
    }

    return reply.success(result);

  } catch (e) {
    throw RoleException.UnknownError(e);
  }
}

export async function getPagingRoleHandler(request, reply) {

  await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

  const data = await validateIt(request.query, PagingDto, [RoleDtoGroup.PAGENATION]);

  const result = await roleService.getPaging(data);

  return reply.success(result);

}

export async function deleteRoleHandler(request, reply) {
  try {

    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.params, RoleDto, [RoleDtoGroup.DELETE]);

    const query = {
      isDeleted: false,
      _id: new Types.ObjectId(data._id),
      createdBy: request.employee._id,
    };

    await roleService.updateOneByQuery(
      query,
      { ...request.body, isDeleted: true, deletedAt: Date.now() },
      { new: true },
    );

    return reply.success(data._id);

  } catch (e) {
    console.log('error Role delete: ', e);
    throw RoleException.UnknownError(e);
  }
}
