'use client';

import { Character, Message } from '@prisma/client';
import { ChatHeader } from '@/components/chat-header';

interface ClientChatProps {
  character: Character & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ClientChat = ({ character }: ClientChatProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader character={character} />
    </div>
  );
};
