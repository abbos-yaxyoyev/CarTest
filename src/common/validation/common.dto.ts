import { IsMongoId, IsOptional } from 'class-validator';
export class CommonDtoGroup {
  static CREATE = 'create';
  static UPDATE = 'update';
  static DELETE = 'delete';
  static GET_BY_ID = 'getById';
  static NUMBER = 'number';
  static PAGENATION = 'pagination';
  static SET_STATE = 'state';
  static POSITION = 'position';
  static CREATE_WEB = 'web';
}

export class CommonDto {
  @IsOptional({ groups: [CommonDtoGroup.PAGENATION] })
  @IsMongoId({
    groups: [
      CommonDtoGroup.UPDATE,
      CommonDtoGroup.DELETE,
      CommonDtoGroup.GET_BY_ID,
      CommonDtoGroup.SET_STATE,
      CommonDtoGroup.PAGENATION,
      CommonDtoGroup.POSITION
    ],
  })
  _id: string;

  @IsOptional({ groups: [CommonDtoGroup.CREATE] })
  @IsMongoId({ groups: [CommonDtoGroup.CREATE] })
  createdBy: string;

  @IsOptional({ groups: [CommonDtoGroup.UPDATE] })
  @IsMongoId({ groups: [CommonDtoGroup.UPDATE] })
  updatedBy: string;

  @IsOptional({ groups: [CommonDtoGroup.DELETE] })
  @IsMongoId({ groups: [CommonDtoGroup.DELETE] })
  deletedBy: string;

  isDeleted?: boolean;
}

export class GetPagingDto { }
