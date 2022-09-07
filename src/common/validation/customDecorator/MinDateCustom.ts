import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function MinDateCustom(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'MinDateCusatom',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log('value custom decorator: ', value);
          return new Date(value) > new Date(); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
