import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, description, instructions, seed, src, categoryId } = body;

    if (!user || !user.id || !user?.firstName) {
      return new NextResponse('Unauthorize', { status: 401 });
    }

    if (
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !src ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const character = await prismadb.character.create({
      data: {
        categoryId,
        userId: user.id,
        username: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(character);
  } catch (error) {
    console.log('Character POST: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
