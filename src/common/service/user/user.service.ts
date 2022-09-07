import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserException } from '../../db/models/user/exception';
import { User, UserModel } from '../../db/models/user/models';
import { CommonUserService } from '../baseUser/commonUser.service';

//! for user  service
class UserService extends CommonUserService<User> {

  constructor(model: ModelType<User>) {
    super(model, UserException);
  }

}

export const userService = new UserService(UserModel);
