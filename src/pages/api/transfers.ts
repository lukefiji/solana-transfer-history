import { env } from '@/env';
import { Transfer } from '@prisma/client';
import algoliasearch from 'algoliasearch';
import { NextApiRequest, NextApiResponse } from 'next';

// Connect and authenticate with Algolia
const client = algoliasearch(
  env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  env.ALGOLIA_ADMIN_API_KEY
);

// Create a new index and add a record
const index = client.initIndex(env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

async function getTransfers(_: NextApiRequest, res: NextApiResponse) {
  try {
    const { hits } = await index.search<Transfer>('');

    return res.status(200).json(hits);
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

    const record = {
      objectID: body.signature, // Required by Algolia
      from: body.from,
      to: body.to,
      amount: body.amount,
      lamports: body.lamports,
      signature: body.signature,
      block: body.block,
    };

    const result = await index.saveObject(record);

    return res.status(200).json(result);
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
