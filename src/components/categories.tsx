'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');

  function handleClick(categoryId: string | undefined) {
    const query = {
      categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  }

  return (
    <div className="flex w-full overflow-x-auto space-x-2 p-1">
      <button
        className={cn(
          'category-button',
          !categoryId ? 'bg-primary/25' : 'bg-primary/10'
        )}
        onClick={() => handleClick(undefined)}
      >
        Newest
      </button>
      {data.map((category) => (
        <button
          key={category.id}
          className={cn(
            'category-button',
            category.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
          )}
          onClick={() => handleClick(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
