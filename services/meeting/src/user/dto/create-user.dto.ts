import { Prisma } from '@prisma/client';
import { UserTypeEnum } from '@d-debt/share';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Capabilities implements Prisma.InputJsonObject {
  readonly [x: string]: Prisma.InputJsonValue;
  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class CreateUserDto {
  // @IsNotEmpty()
  // @IsNumber()
  // id: number;

  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => Capabilities)
  // capabilities: Capabilities;

  // @IsNotEmpty()
  // @IsIn(Object.keys(UserTypeEnum))
  // type: string;

  // @IsNotEmpty()
  // @IsString()
  // name: string;

  // @IsString()
  // level: string;

  // parentId: number;

  // oaCode: string;

  // team: string;

  // token: string;
  @IsNotEmpty()
  @IsNumber()
  id: number;
  username: string;
  password: string;
  type: string;
  level: string;
}
