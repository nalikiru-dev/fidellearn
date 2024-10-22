import { getAuth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  const { role } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user metadata:', error);
    return NextResponse.json({ error: 'Failed to update user metadata' }, { status: 500 });
  }
}
