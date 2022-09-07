import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../constants/collections';
import { CommonModel } from '../base.model';
import { Category } from '../category/models';

export enum Cover {
  HARDCOVER = 'hardcover',
  PAPERBACK = 'paperback',
  PAPER = 'paper',
}

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.CAR,
  },
})

@index(
  {
    categoryId: 1
  },
  {
    background: true,
    name: 'categoryId',
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
      $type: 'boolean',
    },
  },
)
export class Car extends CommonModel {

  @prop({ trim: true, required: true })
  public imgUrl: string;

  @prop({ trim: true, required: true })
  public imgUrlInside: string;

  @prop({ trim: true, required: true })
  public imgUrlAutside: string;

  @prop({ required: true, })
  public price: number;

  @prop({ required: true, })
  public year: number;

  @prop({ trim: true, required: true })
  public description: string;


  @prop({ trim: true, required: true })
  public tonirovka: string;

  @prop({ trim: true, required: true })
  public motor: string;

  @prop({ trim: true, required: true })
  public color: string;

  @prop({ trim: true, required: true })
  public distance: string;

  @prop({ trim: true, required: true })
  public gearbok: string;

  @prop({
    required: true,
    type: Types.ObjectId,
    ref: COLLECTIONS.CATEGORY,
  })
  categoryId: Category;
}
export const CarModel = getModelForClass(Car);
