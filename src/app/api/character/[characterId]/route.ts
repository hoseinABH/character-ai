import prismadb from '@/lib/prismadb';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { characterId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.characterId) {
      return new NextResponse('Character ID required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const character = await prismadb.character.update({
      where: {
        id: params.characterId,
        userId: user.id,
      },
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
    console.log('Character PATCH: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { characterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const deletedCharacter = prismadb.character.delete({
      where: {
        id: params.characterId,
        userId,
      },
    });
    return NextResponse.json(deletedCharacter);
  } catch (error) {
    console.log('Character DELETE: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
