import { ERROR_CODES } from '../../../constants/errors';
import { CommonException } from '../../../constants/exceptions';

export class CategoryException extends CommonException {
  static NotFound(data) {
    return new CommonException(ERROR_CODES.CATEGORY, 'category not found', data);
  }

}
