import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ClientChat } from './components/client-chat';

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const character = await prismadb.character.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!character) redirect('/');

  return <ClientChat character={character} />;
}
