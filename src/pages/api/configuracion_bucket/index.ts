import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { configuracion_bucket } from '@/lib/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const items = await db.select().from(configuracion_bucket);
        return res.status(200).json(items);
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
