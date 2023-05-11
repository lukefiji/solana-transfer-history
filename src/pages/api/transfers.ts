import prisma from '@/server/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

async function getTransfers(_: NextApiRequest, res: NextApiResponse) {
  try {
    const transfers = await prisma.transfer.findMany();

    return res.status(200).json(transfers);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ error: 'Error getting transfer history', success: false });
  }
}

async function createTransfer(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body;

    const newEntry = await prisma.transfer.create({
      data: {
        from: body.from,
        to: body.to,
        amount: body.amount,
        lamports: body.lamports,
        signature: body.signature,
        block: body.block,
      },
    });

    return res.status(200).json(newEntry);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ error: 'Error creating transfer history', success: false });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await getTransfers(req, res);
  } else if (req.method === 'POST') {
    return await createTransfer(req, res);
  } else {
    return res
      .status(405)
      .json({ message: 'Method not allowed', success: false });
  }
}
