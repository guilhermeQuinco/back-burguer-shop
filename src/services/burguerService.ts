import { IBurguer } from "@/@types/Burguer";
import { Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";

export const createBurguer = async (burguerData: Prisma.BurguerCreateInput) => {
  return prisma.burguer.create({
    data: {
      name: burguerData.name,
      price: burguerData.price,
      imageUrl: burguerData.imageUrl,
    },
  });
};

export const getBurguers = async () => {
  return prisma.burguer.findMany();
};

export const getBurguerById = async (id: number) => {
  return prisma.burguer.findUnique({ where: { id } });
};

export const updateBurguer = async (
  id: number,
  burguerData: Partial<IBurguer>
) => {
  return prisma.burguer.update({
    where: { id },
    data: {
      name: burguerData.name,
      price: burguerData.price,
      imageUrl: burguerData.imageUrl,
    },
  });
};

export const deleteBurguer = async (id: number) => {
  const burguer = await prisma.burguer.findUnique({ where: { id } });

  if (!burguer) {
    throw new Error("Burguer not found");
  }

  return prisma.burguer.delete({ where: { id } });
};
