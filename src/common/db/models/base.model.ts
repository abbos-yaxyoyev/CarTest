import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Employee } from './employee/models';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class CommonModel {
  @prop({ default: false })
  isDeleted: boolean;


  @prop({
    type: Types.ObjectId,
    // refPath: 'which',
  })
  createdBy: Ref<Employee>;

  @prop({
    type: Types.ObjectId,
  })
  updatedBy: Ref<Employee>;

  @prop({
    type: Types.ObjectId,
  })
  deletedBy: Ref<Employee>;

  @prop({ default: undefined })
  deletedAt?: Date;

  createdAt?: Date;
  updatedAt: Date;
}
