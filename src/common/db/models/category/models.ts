import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../constants/collections';
import { CommonModel } from '../base.model';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.CATEGORY,
  },
})
@index(
  {
    isDeleted: 1,
  },
  {
    background: true,
    name: 'isDeleted',
  },
)
@index(
  {
    parentId: 1
  },
  {
    background: true,
    name: 'parentId',
    partialFilterExpression: {
      isDeleted: false,
      $type: 'boolean',
    },
  },
)


export class Category extends CommonModel {
  @prop({ trim: true, required: true })
  public name: string;

  @prop({ trim: true, required: true })
  imgUrl: string;

  @prop({
    type: Types.ObjectId,
    ref: COLLECTIONS.CATEGORY,
    default: null
  })
  parentId: Category;
}
export const CategoryModel = getModelForClass(Category);

