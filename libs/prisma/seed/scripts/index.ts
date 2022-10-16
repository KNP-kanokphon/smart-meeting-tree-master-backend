import { Prisma, PrismaClient } from '@prisma/client';
import { assignUserScripts } from './assignUser';
import { assignDistributionScripts } from './assignDistribution';
import { pullbackScripts } from './pullback';
import { updateCusPreUserScripts } from './updateCusPreviousUser';

export default async (prisma: PrismaClient) => {
  const scripts = [
    ...assignUserScripts,
    ...assignDistributionScripts,
    ...pullbackScripts,
    ...updateCusPreUserScripts,
  ];

  for (const script of scripts) {
    await prisma.$executeRaw(Prisma.raw(script));
  }
};
