import { NextResponse } from 'next/server';

import { clerkClient } from '@clerk/nextjs/server';

import { auth } from '@clerk/nextjs/server';



export async function POST(request: Request) {

  try {

    const { userId } = auth();

    if (!userId) {

      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    }



    const { role } = await request.json();

    if (!role) {

      return NextResponse.json({ success: false, error: 'Role is required' }, { status: 400 });

    }



    // Update the user's public metadata with their role
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {

    console.error('Error updating user profile:', error);

    return NextResponse.json({ success: false, error: error.message || 'Failed to update user profile' }, { status: 500 });

  }

}


