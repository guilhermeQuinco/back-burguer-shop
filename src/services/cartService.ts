import { prisma } from "lib/prisma";

export const addToCart = async (itemId: number, quantity: number) => {
  if (!itemId) {
    throw new Error("Burguer not found!");
  }

  try {
    const item = await prisma.item.findFirst({
      where: {
        id: itemId,
      },
    });
  } catch (error) {
    throw new Error("Burguer not found!");
  }

  return await prisma.cart.create({
    data: {
      itemId,
      quantity,
    },
  });
};

export const deleteItemFromCart = async (id: number) => {
  return await prisma.cart.delete({
    where: {
      id,
    },
  });
};

export const changeQuantity = async (id: number, quantity: number) => {
  return await prisma.cart.update({
    where: {
      id,
    },
    data: {
      quantity,
    },
  });
};

export const getCartItems = async () => {
  return await prisma.cart.findMany({
    include: {
      item: true,
    },
  });
};
