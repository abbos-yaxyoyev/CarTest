import { ERROR_CODES } from '../../../constants/errors';
import { CommonException } from '../../../constants/exceptions';

export class CarException extends CommonException {
  static NotFound(data) {
    return new CommonException(ERROR_CODES.CAR, 'car not found', data);
  }

}
