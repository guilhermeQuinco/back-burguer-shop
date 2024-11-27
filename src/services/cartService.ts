import { prisma } from "lib/prisma";

export const addToCart = async (itemId: number, quantity: number) => {
  if (!itemId) {
    throw new Error("Burguer not found!");
  }

  try {
    const burguer = await prisma.item.findFirst({
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

// export const deleteItemFromCart = async (itemId: number) => {
//   const item = await prisma.cart.findFirst({
//     where:
//   })
// };

export const getCartItems = async () => {
  return await prisma.cart.findMany({
    include: {
      item: true,
    },
  });
};
