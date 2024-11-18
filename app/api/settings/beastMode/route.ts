import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { beastMode, focusLevel } = body;

    // Here you would typically update these settings in your database
    // For example using Prisma:
    // await prisma.userSettings.upsert({
    //   where: { userId },
    //   update: { beastMode, focusLevel },
    //   create: { userId, beastMode, focusLevel }
    // });

    return NextResponse.json({
      message: 'Beast Mode settings updated successfully',
      settings: { beastMode, focusLevel }
    });

  } catch (error) {
    console.error('[BEAST_MODE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
