import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto, BaseDtoGroup } from "../base.dto";
import { PagingDto } from "../paging.dto";

export class CarDtoGroup extends BaseDtoGroup {

}

export class CarGetDto extends PagingDto {

  @IsOptional({
    groups: [CarDtoGroup.PAGENATION]
  })
  @IsMongoId({
    groups: [CarDtoGroup.PAGENATION,],
  })
  categoryId: string;

}

export class CarDto extends BaseDto {


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE,]
    }
  )
  price: number;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    {
      groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE,]
    }
  )
  year: number;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  imgUrl: string;

  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  imgUrlInside: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  imgUrlAutside: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  description: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  tonirovka: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  motor: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  color: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  distance: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsString({
    groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE]
  })
  gearbok: string;


  @IsOptional({
    groups: [CarDtoGroup.UPDATE]
  })
  @IsMongoId(
    {
      groups: [CarDtoGroup.CREATE, CarDtoGroup.UPDATE],
    }
  )
  categoryId: string;
}