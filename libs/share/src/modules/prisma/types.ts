/* eslint-disable @typescript-eslint/indent */
import { Prisma, PrismaClient } from '@prisma/client';

export type TQueryClient =
  | PrismaClient
  | Omit<
      PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
      >,
      '$connect' | '$disconnect' | '$on' | '$use' | '$transaction'
    >;
