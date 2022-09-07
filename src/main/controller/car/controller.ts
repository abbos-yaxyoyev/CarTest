import { Types } from 'mongoose';
import { Roles } from '../../../common/constants/roles';
import { CarException } from '../../../common/db/models/car/exceptions';
import { carService } from '../../../common/service/car/car.service';
import { roleService } from '../../../common/service/employee/role/role.service';
import { CarDto, CarDtoGroup, CarGetDto } from '../../../common/validation/dtos/car/car.dto';
import { validateIt } from '../../../common/validation/validate';

export async function createCarHandler(request, reply) {
  try {

    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, CarDto, [CarDtoGroup.CREATE]);

    const result = await carService.create(data);

    return reply.success(result._id);

  } catch (e) {

    throw CarException.UnknownError(e);

  }
}

export async function updateByCarIdHandler(request, reply) {
  try {

    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, CarDto, [CarDtoGroup.UPDATE]);

    const query = {
      _id: new Types.ObjectId(data._id),
      isDeleted: false,
      cretedBy: request.employee._id,
    }

    const result = await carService.updateByQuery(query, data);

    return reply.success(result._id);

  } catch (e) {

    throw CarException.UnknownError(e);

  }
}

export async function getByCarIdHandler(request, reply) {
  try {

    const data = await validateIt(request.params, CarDto, [CarDtoGroup.GET_BY_ID]);

    const result = await carService.getById(data._id);

    if (!result) {
      throw CarException.NotFound(result);
    }

    return reply.success(result);

  } catch (e) {
    throw CarException.UnknownError(e);
  }
}

export async function getPagingCarHandler(request, reply) {

  const data = await validateIt(request.query, CarGetDto, [CarDtoGroup.PAGENATION]);

  const result = await carService.getPaging(data);

  return reply.success(result);

}

export async function deleteByCarIdHandler(request, reply) {
  try {
    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.params, CarDto, [CarDtoGroup.DELETE]);

    const query = {
      isDeleted: false,
      _id: new Types.ObjectId(data._id),
      cretedBy: request.employee._id,
    };

    await carService.updateOneByQuery(
      query,
      { ...request.body, isDeleted: true, deletedAt: Date.now() },
      { new: true },
    );

    return reply.success(data._id);

  } catch (e) {
    console.log('error Car delete: ', e);
    throw CarException.UnknownError(e);
  }
}
