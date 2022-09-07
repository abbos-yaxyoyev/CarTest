import { ModelType } from '@typegoose/typegoose/lib/types';
import { CommonUserException } from '../../constants/exceptions';
import { CommonUser } from '../../db/baseUser.model';
import { CommonServices } from '../common.service';

export class CommonUserService<T> extends CommonServices<T> {
  constructor(model: ModelType<T>, ErrorException) {
    super(model, ErrorException);

  }

  public async findByPhone(phoneNumber) {
    return await this.findOne<CommonUser>({ phoneNumber, isDeleted: false });
  }

  public async findByIdError(id, options?, projection?) {
    const user = await this.findById(id, options, projection);
    if (!user) throw CommonUserException.NotFound(id);
    return user;
  }

  public async findByPhoneError(phoneNumber) {
    const user = await this.findByPhone(phoneNumber);
    if (!user) throw CommonUserException.NotFound(phoneNumber);
    return user;
  }

  public async updateById(id: string, data) {
    return await this.updateOne(id, data);
  }

  public async updateByQuery(id: string, data) {
    return await this.updateOne(id, data);
  }


  public async deletedOne(id: string) {
    return await this.deleteOne(id);
  }


}
