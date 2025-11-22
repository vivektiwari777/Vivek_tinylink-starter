import prisma from '../../../lib/prisma';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json(links);
  } else if (req.method === 'POST') {
    try {
      const { url, code } = req.body;
      if (!url) return res.status(400).json({ error: 'URL required' });
      if (!code) return res.status(400).json({ error: 'Code required' });
      // validate code pattern
      if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
        return res.status(400).json({ error: 'Code must match [A-Za-z0-9]{6,8}' });
      }
      const exists = await prisma.link.findUnique({ where: { code } });
      if (exists) return res.status(409).json({ error: 'Code exists' });
      const link = await prisma.link.create({ data: { code, url } });
      return res.status(201).json(link);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET','POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}