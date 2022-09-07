import { Transform } from "class-transformer";
import { IsMongoId, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { BaseDto, BaseDtoGroup } from "../base.dto";

export class EmployeeDtoGroup extends BaseDtoGroup {

  static LOGIN = 'login';

  static VERIFY_OTP = 'verify-otp';
}

export class EmployeeDto extends BaseDto {

  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsMongoId(
    {
      groups: [EmployeeDtoGroup.UPDATE],
    }
  )
  _id: string;

  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsString({
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE]
  })
  fullName: string;

  @IsOptional({ groups: [EmployeeDtoGroup.UPDATE] })
  @Transform(({ value }) => `+${value?.replace(/[^0-9]/g, '')}`)
  @IsPhoneNumber(null, {
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE, EmployeeDtoGroup.LOGIN,],
  })
  phoneNumber: string;


  @IsOptional({
    groups: [EmployeeDtoGroup.UPDATE]
  })
  @IsString({
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE, EmployeeDtoGroup.LOGIN]
  })
  password: string;


  @IsOptional({
    groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE]
  })
  @IsMongoId(
    {
      groups: [EmployeeDtoGroup.CREATE, EmployeeDtoGroup.UPDATE],
    }
  )
  roleId: string;
}