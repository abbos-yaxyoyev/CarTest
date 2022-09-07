import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { COLLECTIONS } from '../../../constants/collections';
import { CommonUser } from '../../baseUser.model';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.USER,
  },
})

@index(
  {
    isDeleted: 1,
  },
  {
    name: 'isDeleted',
    unique: true,
    background: true,
  },
)

export class User extends CommonUser {

  @prop({ required: true, trim: true })
  public password: string;

}
export const UserModel = getModelForClass(User);
