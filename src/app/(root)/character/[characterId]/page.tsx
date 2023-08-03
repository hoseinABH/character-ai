import prismadb from '@/lib/prismadb';
import { CharacterForm } from './components/character-form';
import { auth, redirectToSignIn } from '@clerk/nextjs';

interface CharacterPageProps {
  params: {
    characterId: string;
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const character = await prismadb.character.findUnique({
    where: { id: params.characterId, userId },
  });

  const categories = await prismadb.category.findMany();

  return <CharacterForm initialData={character} categories={categories} />;
}
