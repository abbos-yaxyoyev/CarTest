import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../constants/collections';
import { CarException } from '../../db/models/car/exceptions';
import { Car, CarModel } from '../../db/models/car/models';
import { CarGetDto } from '../../validation/dtos';
import { CommonServices } from '../common.service';

class CarService extends CommonServices<Car> {

  constructor(model: ModelType<Car>) {
    super(model, CarException);
  }

  public async createCar(data) {
    const result = await this.create(data);
    return result;
  }

  public async findByIdError(id) {
    const book = await this.findById(id);
    if (!book) throw CarException.NotFound(id);
    return book;
  }

  public async updateById(id: string, data) {
    return await this.updateOne(id, data);
  }

  public async updateByQuery(query, data) {
    return await this.updateOneByQuery(query, data);
  }

  public async getById(id: string) {
    try {

      const $match = {
        $match: {
          _id: new Types.ObjectId(id),
          isDeleted: false,
        }
      };

      const $lookup = {
        $lookup: {
          from: COLLECTIONS.CATEGORY,
          foreignField: '_id',
          localField: 'categoryId',
          as: 'marka',
        },
      };

      const $unwind = {
        $unwind: {
          path: '$marka',
          preserveNullAndEmptyArrays: true,
        }
      }

      const $projection = {
        $project: {
          _id: 1,

          price: 1,

          year: 1,

          description: 1,

          tonirovka: 1,

          motor: 1,

          color: 1,

          distance: 1,

          gearbok: 1,

          imgUrl: 1,

          imgInnerUrl: 1,

          imgAutsideUrl: 1,

          marka: {
            _id: 1,
            name: 1
          },

        },
      };

      const $pipline = [
        $match,
        $lookup,
        $unwind,
        $projection,
      ];

      const data = (await this.aggregate($pipline)).shift();

      if (!data) throw CarException.NotFound(id);

      return data

    } catch (error) {
      throw CarException.UnknownError(error);
    }
  }


  public async getPaging(dto: CarGetDto,) {
    try {

      if (!dto.sortBy) {
        dto.sortBy = 'createdAt';
      }

      const query: any = {
        isDeleted: false,
        categoryId: new Types.ObjectId(dto.categoryId)
      };

      const $lookup = {
        $lookup: {
          from: COLLECTIONS.CATEGORY,
          foreignField: '_id',
          localField: 'categoryId',
          as: 'marka',
        },
      };

      const $unwind = {
        $unwind: {
          path: '$marka',
          preserveNullAndEmptyArrays: true,
        }
      }

      const $projection = {
        $project: {

          _id: 1,

          price: 1,

          year: 1,

          description: 1,

          tonirovka: 1,

          motor: 1,

          color: 1,

          distance: 1,

          gearbok: 1,

          imgUrl: 1,

          imgInnerUrl: 1,

          imgAutsideUrl: 1,

          marka: {
            _id: 1,
            name: 1
          },

        },
      };

      const $pipline: any = [
        $lookup,
        $unwind,
        $projection
      ];

      return await this.findPaging(query, dto, $pipline);
    } catch (error) {
      throw CarException.UnknownError(error);
    }
  }

}

export const carService = new CarService(CarModel);
