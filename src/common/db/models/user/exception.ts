import { ERROR_CODES } from '../../../constants/errors';
import { CommonException } from '../../../constants/exceptions';

export class UserException extends CommonException {
  static AllreadyExist(data) {
    return new UserException(ERROR_CODES.EMPLOYEE, 'user exist', data);
  }
  static NotFound(data) {
    return new UserException(ERROR_CODES.EMPLOYEE + 1, 'user not found', data);
  }
  static IncorrectOtp(data) {
    return new UserException(ERROR_CODES.EMPLOYEE + 2, 'incorrect otp', data);
  }
  static OtpExpired(data) {
    return new UserException(ERROR_CODES.EMPLOYEE + 3, 'expired otp code ', data);
  }
  static Blocked(block_time) {
    return new UserException(
      ERROR_CODES.EMPLOYEE + 4,
      `block ${block_time / 60} minutes`,
      'you have made too many attempts ',
    );
  }
  static NotEnoughPermission(data: any = null) {
    return new UserException(ERROR_CODES.EMPLOYEE + 5, 'Not enough permissions to access', data);
  }
}
