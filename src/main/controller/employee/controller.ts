import md5 from 'md5';
import { Types } from 'mongoose';
import { Roles } from '../../../common/constants/roles';
import { EmployeeException } from '../../../common/db/models/employee/exceptions';
import { employeeService } from '../../../common/service/employee/employee.service';
import { roleService } from '../../../common/service/employee/role/role.service';
import { PagingDto } from '../../../common/validation/dtos';
import { EmployeeDto, EmployeeDtoGroup } from '../../../common/validation/dtos/employee/employee.dto';
import { validateIt } from '../../../common/validation/validate';

export async function createEmployeeHandler(request, reply) {
  try {

    const data = await validateIt(request.body, EmployeeDto, [EmployeeDtoGroup.CREATE]);

    data.password = md5(data.password)

    const result = await employeeService.create(data);

    return reply.success(result._id);

  } catch (e) {

    throw EmployeeException.UnknownError(e);

  }
}

export async function loginEmployeeHandler(request, reply) {
  try {

    const data = await validateIt(request.body, EmployeeDto, [EmployeeDtoGroup.LOGIN]);

    console.log("login employee: ", data);


    const result = await employeeService.login(request, data.phoneNumber, data.password);

    return reply.success(result);

  } catch (e) {

    throw EmployeeException.UnknownError(e);

  }
}

export async function updateByEmployeeIdHandler(request, reply) {
  try {

    // await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, EmployeeDto, [EmployeeDtoGroup.UPDATE]);

    const result = await employeeService.updateOne(data._id, data, { new: true });

    return reply.success(result._id);

  } catch (e) {

    throw EmployeeException.UnknownError(e);

  }
}

export async function updateEmployeeAccountIdHandler(request, reply) {
  try {

    // await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.body, EmployeeDto, [EmployeeDtoGroup.UPDATE]);

    data.password = md5(data.password);

    const result = await employeeService.updateOne(request.employee._id, data, { new: true });

    return reply.success(result._id);

  } catch (e) {

    throw EmployeeException.UnknownError(e);

  }
}

export async function getByEmployeeAccountHandler(request, reply) {
  try {

    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const result = await employeeService.findById(request.employee._id);

    return reply.success(result);

  } catch (e) {
    throw EmployeeException.UnknownError(e);
  }
}

export async function getPagingEmployeeHandler(request, reply) {

  await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

  const data = await validateIt(request.query, PagingDto, [EmployeeDtoGroup.PAGENATION]);

  const result = await employeeService.getPaging(data);

  return reply.success(result);

}

export async function deleteByEmployeeIdHandler(request, reply) {
  try {
    await roleService.hasAccess(request.employee.roleId, Roles.EMPLOYEE);

    const data = await validateIt(request.params, EmployeeDto, [EmployeeDtoGroup.DELETE]);

    const query = {
      isDeleted: false,
      _id: new Types.ObjectId(data._id),
    };

    await employeeService.updateOneByQuery(
      query,
      { ...request.body, isDeleted: true, deletedAt: Date.now() },
      { new: true },
    );

    return reply.success(data._id);

  } catch (e) {
    console.log('error Car delete: ', e);
    throw EmployeeException.UnknownError(e);
  }
}
