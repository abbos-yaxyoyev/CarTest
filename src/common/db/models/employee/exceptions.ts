import { ERROR_CODES } from '../../../constants/errors';
import { CommonException } from '../../../constants/exceptions';

export class EmployeeException extends CommonException {
  static AllreadyExist(data) {
    return new EmployeeException(ERROR_CODES.EMPLOYEE, 'employee exist', data);
  }

  static NotFound(data) {
    return new EmployeeException(ERROR_CODES.EMPLOYEE + 1, 'employee not found', data);
  }


  static Blocked(block_time) {
    return new EmployeeException(
      ERROR_CODES.EMPLOYEE + 2,
      `block ${block_time / 60} minutes`,
      'you have made too many attempts ',
    );
  }

  static NotEnoughPermission(data: any = null) {
    return new EmployeeException(ERROR_CODES.EMPLOYEE + 3, 'Not enough permissions to access', data);
  }

  static InvalidPassword(data: any = null) {
    return new EmployeeException(ERROR_CODES.EMPLOYEE + 4, 'Invalid password', data);
  }
}
