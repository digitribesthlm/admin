import { connectToDatabase } from '../../../lib/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { db } = await connectToDatabase();
  const usersCollection = db.collection('users');

  if (req.method === 'GET') {
    try {
      const user = await usersCollection.findOne(
        { email: session.user.email },
        { projection: { password: 0 } } // Exclude password from response
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user settings:', error);
      return res.status(500).json({ error: 'Failed to fetch user settings' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updateData = req.body;
      
      // Prevent updating sensitive fields
      delete updateData.password;
      delete updateData._id;
      delete updateData.role;
      delete updateData.clientId;

      const result = await usersCollection.updateOne(
        { email: session.user.email },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
      console.error('Error updating user settings:', error);
      return res.status(500).json({ error: 'Failed to update user settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 