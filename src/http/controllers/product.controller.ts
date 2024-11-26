import { env } from "@/env";
import * as burguerService from "@/services/burguerService";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { number, z } from "zod";

export async function createBurguer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const createBurguerBodySchema = z.object({
      name: z.string(),
      price: z.number(),
      imageUrl: z.string(),
    });

    const { name, price, imageUrl } = createBurguerBodySchema.parse(
      request.body
    );

    const burguerData: any = {
      name,
      price,
      imageUrl,
    };

    const base64Image = burguerData.imageUrl;

    // if (base64Image) {
    //   const imageData = base64Image.replace(/^data:image\/\w+;base64,/, "");

    //   const response = await axios.post(
    //     "https://api.imgbb.com/1/upload",
    //     {
    //       key: env.IMG_BB_KEY,
    //       image: imageData,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    //   burguerData.imageUrl = response.data.data.url;
    // }

    const createdBurguer = await burguerService.createBurguer(burguerData);

    return reply
      .status(201)
      .send({ message: "burguer created", data: createdBurguer });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getBurguers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const burguers = await burguerService.getBurguers();

    return reply.status(200).send(burguers);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function getBurguerById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  try {
    const burguer = await burguerService.getBurguerById(id);

    return reply.status(200).send(burguer);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function updateBurguer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  const burgerData: any = request.body;

  try {
    const burguer = await burguerService.updateBurguer(id, burgerData);

    return reply.status(200).send(burguer);
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}

export async function deleteBurguer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getBurguerParamSchema = z.object({
    id: z.coerce.number(),
  });

  const { id } = getBurguerParamSchema.parse(request.params);

  try {
    await burguerService.deleteBurguer(id);

    return reply.status(204).send({ message: "buguer deleted" });
  } catch (error) {
    reply.status(500).send({ message: (error as Error).message });
  }
}
