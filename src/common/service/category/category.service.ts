import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../constants/collections';
import { CategoryException } from '../../db/models/category/exceptions';
import { Category, CategoryModel } from '../../db/models/category/models';
import { CommonServices } from '../common.service';
import { PagingDto } from './../../validation/dtos/paging.dto';

class CategoryService extends CommonServices<Category>{

  constructor(model: ModelType<Category>) {
    super(model, CategoryException);
  }

  public async createCategory(data) {
    return await this.create(data);
  }

  public async findByIdError(id) {
    const genre = await this.findById(id);
    if (!genre) throw CategoryException.NotFound(id);
    return genre;
  }

  public async getCategoryById(id: string) {
    try {

      const $match = {
        $match: {
          isDeleted: false,
          _id: new Types.ObjectId(id),
        }
      };

      const $lookup = {

        $lookup: {
          from: COLLECTIONS.CATEGORY,
          foreignField: '_id',
          localField: 'parentId',
          as: 'parent',
        },
      };

      const $unwind = {

        $unwind: {
          path: '$parent',
          preserveNullAndEmptyArrays: true,
        }

      }

      const $projection = {
        $project: {
          name: 1,
          imgUrl: 1,
          parent: {
            _id: 1,
            name: 1,
            imgUrl: 1
          }
        }
      }

      const $pipeline = [
        $match,
        $lookup,
        $unwind,
        $projection
      ]

      const result = (await this.aggregate($pipeline)).shift();

      return result;

    } catch (e) {
      console.log("error category paging: ", e);
      if (e instanceof CategoryException) {
        throw e;
      } else {
        throw CategoryException.UnknownError(e);
      }
    }
  }

  public async getCategoryPaging(dto: PagingDto) {
    try {

      let { search } = dto;
      let query: any = { isDeleted: false, parentId: { $ne: null } };

      if (search) {
        query['name'] = {
          $options: 'i',
          $regex: dto.search,
        };
      }

      const $lookup = {

        $lookup: {
          from: COLLECTIONS.CATEGORY,
          foreignField: '_id',
          localField: 'parentId',
          as: 'parent',
        },
      };

      const $unwind = {

        $unwind: {
          path: '$parent',
          preserveNullAndEmptyArrays: true,
        }

      }

      const $projection = {
        $project: {
          name: 1,
          imgUrl: 1,
          parent: {
            _id: 1,
            name: 1,
            imgUrl: 1
          }
        }
      }

      const $pipeline = [
        $lookup,
        $unwind,
        $projection
      ]

      if (!dto.limit) {
        dto.limit = await this.count(query)
      }

      return await this.findPaging(query, dto, $pipeline, { position: 1, _id: 1 })
    } catch (e) {
      console.log("error category paging: ", e);
      if (e instanceof CategoryException) {
        throw e;
      } else {
        throw CategoryException.UnknownError(e);
      }
    }
  }


  public async getMarkaPaging(dto: PagingDto) {
    try {

      let { search } = dto;
      let query: any = { isDeleted: false, parentId: null };

      if (search) {
        query['$expr'] = {
          $regexMatch: {
            input: '$name',
            options: 'i',
            regex: dto.search,
          },
        };
      }

      const $projection = {
        $project: {
          name: 1,
          imgUrl: 1,
        }
      }

      const $pipeline = [
        $projection
      ]

      if (!dto.limit) {
        dto.limit = await this.count(query)
      }

      return await this.findPaging(query, dto, $pipeline, { position: 1, _id: 1 })
    } catch (e) {
      console.log("error category paging: ", e);
      if (e instanceof CategoryException) {
        throw e;
      } else {
        throw CategoryException.UnknownError(e);
      }
    }
  }


}

export const categoryService = new CategoryService(CategoryModel)