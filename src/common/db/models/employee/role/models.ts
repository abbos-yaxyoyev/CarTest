import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';
import { COLLECTIONS } from '../../../../constants/collections';
import { CommonModel } from '../../base.model';

@modelOptions({
  schemaOptions: {
    collection: COLLECTIONS.ROLE,
  },
})
@index(
  {
    name: 1,
  },
  {
    unique: true,
    name: 'name',
    background: true,
    partialFilterExpression: {
      isDeleted: false,
      $type: 'boolean',
    },
  },
)
@index(
  {
    isDeleted: 1,
  },
  {
    background: true,
    name: 'isDeleted',
  },
)
export class Role extends CommonModel {
  @prop({
    trim: true,
    required: true,
  })
  name: string;

  /* --- role --- */
  @prop({
    default: false
  })
  role: boolean;

  @prop({
    default: false
  })
  roleCreate: boolean;

  @prop({
    default: false
  })
  roleUpdate: boolean;

  @prop({
    default: false
  })
  roleDelete: boolean;


  /* --- employee --- */
  @prop({
    default: true
  })
  employee: boolean;

  @prop({
    default: true
  })
  employeeCreate: boolean;

  @prop({
    default: true
  })
  employeeUpdate: boolean;

  @prop({
    default: true
  })
  employeeDelete: boolean;

}

export const RoleModel = getModelForClass(Role);