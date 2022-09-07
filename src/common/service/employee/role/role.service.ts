import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { EmployeeException } from '../../../db/models/employee/exceptions';
import { RoleException } from '../../../db/models/employee/role/exceptions';
import { Role, RoleModel } from '../../../db/models/employee/role/models';
import { PagingDto } from '../../../validation/dtos';
import { CommonServices } from '../../common.service';
import { COLLECTIONS } from './../../../constants/collections';

class RoleService extends CommonServices<Role> {
  constructor(model: ModelType<Role>) {
    super(model, RoleException);
  }

  public async createRole(data) {
    return await this.create(data);
  }

  public async updateById(id: string, data) {
    return await this.updateOne(id, data);
  }

  public async updateByQury(query, data) {
    return await this.updateOneByQuery(query, data);
  }

  public async findByIdError(id) {
    const role = await this.findById(id);
    if (!role) throw RoleException.NotFound(id);
    return role;
  }

  public async hasAccess(id: string, access: string) {
    console.log("roleId: ", id);
    const role = await this.findById(id);
    if (!role[access] || role.isDeleted) throw EmployeeException.NotEnoughPermission();
  }

  public async checkEmployeeRole(id: string) {
    try {
      const $pipeline = [
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: COLLECTIONS.EMPLOYEE,
            localField: '_id',
            foreignField: 'roleId',
            as: 'employee',
          },
        },
        {
          $unwind: {
            path: '$employee',
          },
        },
        {
          $replaceRoot: {
            newRoot: '$employee',
          },
        },
        {
          $match: {
            deletedAt: null,
            isDeleted: false,
          },
        },
        {
          $replaceWith: {
            employeeId: '$_id',
            fullName: '$fullName',
            phoneNumber: '$phoneNumber',
            createdAt: '$createdAt',
          },
        },
      ];
      return await roleService.aggregate($pipeline);
    } catch (e) {
      throw RoleException.UnknownError(e);
    }
  }

  public async getById(id: string) {
    try {
      let $match = {
        $match: {
          isDeleted: false,
          _id: new Types.ObjectId(id)
        }
      };

      const $projection = {
        $project: {
          __v: 0
        },
      };

      const $pipline = [$match, $projection];

      const result = (await this.aggregate($pipline)).shift();
      return result
    } catch (e) {
      throw RoleException.UnknownError(e);
    }
  }

  public async getPaging(dto: PagingDto) {
    try {
      let query = {
        isDeleted: false,
      };

      const $projection = {
        $project: {
          __v: 0
        },
      };

      const $pipline = [$projection];

      return await this.findPaging(query, dto, $pipline);
    } catch (e) {
      throw RoleException.UnknownError(e);
    }
  }

}

export const roleService = new RoleService(RoleModel);
