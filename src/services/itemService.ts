import { IItem } from "@/@types/Burguer";
import { Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";

export const createItem = async (burguerData: Prisma.ItemCreateInput) => {
  return prisma.item.create({
    data: {
      name: burguerData.name,
      price: burguerData.price,
      imageUrl: burguerData.imageUrl,
    },
  });
};

export const getItems = async () => {
  return prisma.item.findMany();
};

export const getItemById = async (id: number) => {
  return prisma.item.findUnique({ where: { id } });
};

export const updateItem = async (id: number, itemData: Partial<IItem>) => {
  return prisma.item.update({
    where: { id },
    data: {
      name: itemData.name,
      price: itemData.price,
      description: itemData.description,
      imageUrl: itemData.imageUrl,
    },
  });
};

export const deleteItem = async (id: number) => {
  const item = await prisma.item.findUnique({ where: { id } });

  if (!item) {
    throw new Error("Burguer not found");
  }

  return prisma.item.delete({ where: { id } });
};
