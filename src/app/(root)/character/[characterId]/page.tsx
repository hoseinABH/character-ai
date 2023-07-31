import prismadb from '@/lib/prismadb';
import { CharacterForm } from './components/category-form';

interface CharacterPageProps {
  params: {
    characterId: string;
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const character = await prismadb.character.findUnique({
    where: { id: params.characterId },
  });

  const categories = await prismadb.category.findMany();

  return <CharacterForm initialData={character} categories={categories} />;
}
