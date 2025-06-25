import { prisma } from "lib/prisma";

// export async function createOrder() {
//   return await prisma.$transaction(async (service) => {
//     const cartItems = await service.cart.findMany({
//       include: {
//         item: true,
//       },
//     });

//     if (!cartItems) {
//       throw new Error("cart is empty");
//     }

//     const price = cartItems.reduce((prev, current) => {
//       return prev + current.quantity * current.item.price;
//     }, 0);

//     const order = await service.order.create({
//       data: {
//         netAmount: price,
//         items: {
//           create: cartItems.map((cart) => {
//             return {
//               itemId: cart.itemId,
//               quantity: cart.quantity,
//             };
//           }),
//         },
//       },
//     });

//     await service.cart.deleteMany({});

//     return {
//       order,
//     };
//   });
// }

export async function getOrders() {
  return await prisma.order.findMany({
    include: {
      items: {
        include: {
          item: true,
        },

        orderBy: {
          id: "desc",
        },
      },
    },
  });
}

export async function getOrderById(id: number) {
  return await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
    },
  });
}

export async function cancelOrder(orderId: number) {
  return await prisma.$transaction(async (service) => {
    await service.orderItem.deleteMany({
      where: {
        orderId,
      },
    });

    await service.order.delete({
      where: {
        id: orderId,
      },
    });
  });
}
