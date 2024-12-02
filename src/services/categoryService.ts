import { prisma } from "lib/prisma";

export const getCategoryItems = async (slug: string) => {
  return await prisma.category.findFirst({
    where: {
      slug,
    },
    include: {
      items: true,
    },
  });
};

export const getCategories = async () => {
  return await prisma.category.findMany({
    include: {
      items: true,
    },
  });
};
