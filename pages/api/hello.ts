// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client/edge";
import useAccelerate from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(useAccelerate);

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await prisma.user.findMany({
    where: { id: 2 },
    cacheStrategy: { swr: 60, ttl: 60 },
  });

  const data = JSON.stringify(users, null, 2);

  return new Response(data, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
