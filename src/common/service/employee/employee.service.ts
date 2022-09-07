import { ModelType } from '@typegoose/typegoose/lib/types';
import md5 from 'md5';
import { EmployeeException } from '../../db/models/employee/exceptions';
import { Employee, EmployeeModel } from '../../db/models/employee/models';
import { jwtSign } from '../../plugin/authPlugin';
import { PagingDto } from '../../validation/dtos';
import { CommonUserService } from '../baseUser/commonUser.service';

class EmployeeService extends CommonUserService<Employee> {

  constructor(model: ModelType<Employee>) {
    super(model, EmployeeException);
  }

  public async login(request: Request, phoneNumber: string, password: string) {

    const employee = await this.findOne({ phoneNumber });

    if (!employee) throw EmployeeException.NotFound(phoneNumber);

    console.log("employee.password != md5(password)", employee.password != md5(password));
    console.log("employee.password ", employee.password);
    console.log(" md5(password)", md5(password));


    if (employee.password != md5(password)) throw EmployeeException.InvalidPassword(password);

    const token = await jwtSign(request, { _id: employee._id, phoneNumber: employee.phoneNumber });

    return {
      _id: employee._id,
      phoneNumber: employee.password,
      fullName: employee.fullName,
      token
    }

  }

  public async getPaging(dto: PagingDto) {

    if (!dto.sortBy) {
      dto.sortBy = 'createdAt';
    }


    const query: any = {
      isDeleted: false,
    }

    const $projection = {
      $project: {

        _id: 1,

        fullName: 1,

        phoneNumber: 1,

      },
    };

    const $pipline: any = [
      $projection
    ];

    return await this.findPaging(query, dto, $pipline);

  }


}

export const employeeService = new EmployeeService(EmployeeModel);
