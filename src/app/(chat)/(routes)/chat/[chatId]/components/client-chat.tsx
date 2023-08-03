'use client';
import { useCompletion } from 'ai/react';
import { Character, Message } from '@prisma/client';
import { ChatHeader } from '@/components/chat-header';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatMessageProps } from '@/components/chat-message';
import { ChatMessages } from '@/components/chat-messages';
import { ChatForm } from '@/components/chat-form';

interface ClientChatProps {
  character: Character & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ClientChat = ({ character }: ClientChatProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    character.messages
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${character.id}`,
      onFinish(_prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: 'system',
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput('');

        router.refresh();
      },
    });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: 'user',
      content: input,
    };

    setMessages((current) => [...current, userMessage]);

    handleSubmit(event);
  };
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader character={character} />
      <ChatMessages
        character={character}
        messages={messages}
        isLoading={isLoading}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
