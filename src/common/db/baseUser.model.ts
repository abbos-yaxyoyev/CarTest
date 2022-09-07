import { index, prop } from '@typegoose/typegoose';
import { CommonModel } from './models/base.model';

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
    phoneNumber: 1,
  },
  {
    unique: true,
    name: 'phoneNumber',
    background: true,
    partialFilterExpression: {
      isDeleted: false,
      $type: 'boolean',
    },
  },
)
export class CommonUser extends CommonModel {
  @prop({ trim: true, required: true })
  public fullName: string;


  @prop({ trim: true, required: true })
  public phoneNumber: string;

}
