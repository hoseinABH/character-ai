'use client';

import { Category, Character } from '@prisma/client';

interface CategoryFormProps {
  initialData: Character | null;
  categories: Category[];
}

export const CharacterForm = ({
  initialData,
  categories,
}: CategoryFormProps) => {
  return <div>Form</div>;
};
