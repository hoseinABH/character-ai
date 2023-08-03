'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Character } from '@prisma/client';
import Image from 'next/image';
import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

interface CharactersProps {
  data: (Character & {
    _count: {
      messages: number;
    };
  })[];
}

export const Characters = ({ data }: CharactersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (data.length === 0)
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill className="grayscale" alt="empty" src="/empty.png" />
        </div>
        <p className="text-sm text-muted-foreground">No Character found.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {data.map((character) => (
        <Card
          key={character.id}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${character.id}`}>
            <CardHeader className="flex items-center justify-center text-muted-foreground text-center">
              <div className="relative w-32 h-32">
                <Image
                  fill
                  src={character.src}
                  alt={character.name}
                  className="rounded-xl object-cover"
                />
              </div>
              <p className="font-bold">{character.name}</p>
              <p className="text-xs">{character.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{character.username}</p>
              <div className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1" />
                {character._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
