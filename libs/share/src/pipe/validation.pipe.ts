import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AppError } from '../errors';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new AppError('BAD_INPUT_PARAMETER');
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object, BigInt];
    return !types.find((type) => metatype === type);
  }
}
