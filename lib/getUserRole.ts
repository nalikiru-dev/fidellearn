import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function getUserRole(): Promise<string | null> {
  const { userId } = auth();
  if (!userId) return null;

  try {
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata.role as string || null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
}
