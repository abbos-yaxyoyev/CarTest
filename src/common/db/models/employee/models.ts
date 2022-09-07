import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { COLLECTIONS } from '../../../constants/collections';
import { CommonUser } from '../../baseUser.model';
import { Role } from './role/models';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.EMPLOYEE,
  },
})

export class Employee extends CommonUser {
  @prop({
    required: true,
    type: Types.ObjectId,
    ref: COLLECTIONS.ROLE,
  })
  roleId: Ref<Role>;

  @prop({ required: true, trim: true })
  public password: string;
}
export const EmployeeModel = getModelForClass(Employee);
