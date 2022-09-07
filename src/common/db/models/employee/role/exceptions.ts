import { ERROR_CODES } from '../../../../constants/errors';
import { CommonException } from '../../../../constants/exceptions';

export class RoleException extends CommonException {
  static NotFound(data) {
    return new CommonException(ERROR_CODES.ROLE, 'Role not found', data);
  }
  static RoleOfAdmins(data) {
    return new CommonException(ERROR_CODES.ROLE + 1, 'There are appropriate admins for this role ', data);
  }
}
