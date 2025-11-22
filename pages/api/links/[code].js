
import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
  const { code } = req.query;

  if (req.method === 'GET') {
    const link = await prisma.link.findUnique({ where: { code } });

    if (!link) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json(link);
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.link.delete({ where: { code } });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(404).json({ error: 'Not found' });
    }
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
