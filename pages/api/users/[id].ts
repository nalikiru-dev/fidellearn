import { NextApiRequest, NextApiResponse } from 'next';
import { clerkClient } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await clerkClient.users.getUser(id);
    
    if (req.method === 'GET') {
      return res.status(200).json(user);
    } else if (req.method === 'PATCH') {
      const updatedUser = await clerkClient.users.updateUser(id, req.body);
      return res.status(200).json(updatedUser);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
