'use client';

import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BubbleChat } from 'flowise-embed-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Client, clientList } from '@/lib/constants';
import { toast } from '@/components/ui/use-toast';

const Chatbot = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [client, setClient] = useState<Client>(
    clientList.find((client) => client.name === searchParams.get('client')) || clientList[0],
  );
  const router = useRouter();

  const handleChangeFlow = (namespace: string) => {
    const selectedClient = clientList.find((client) => client.namespace === namespace);

    if (selectedClient) {
      setClient(selectedClient);
      router.replace(`${pathname}?client=${selectedClient.name}`);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  if (!process.env.NEXT_PUBLIC_FLOWISE_URL || !process.env.NEXT_PUBLIC_FLOWISE_QUERY_ID) {
    toast({
      variant: 'destructive',
      title: 'Failed',
      description: 'API is not set. Please contact admin to add this value',
    });
    return null;
  }

  return (
    <>
      <div className='fixed right-[80px] bottom-[23px]'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>{client.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Select Namespace</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={client.namespace} onValueChange={handleChangeFlow}>
              {clientList.map((client) => (
                <DropdownMenuRadioItem key={client.namespace} value={client.namespace}>
                  {client.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <BubbleChat
        chatflowid={process.env.NEXT_PUBLIC_FLOWISE_QUERY_ID}
        apiHost={process.env.NEXT_PUBLIC_FLOWISE_URL}
        chatflowConfig={{
          pineconeNamespace: client.namespace,
        }}
        theme={{
          button: {
            backgroundColor: '#f97316',
            right: 20,
            bottom: 20,
            size: 'medium',
            iconColor: 'white',
            // customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
          },
          chatWindow: {
            welcomeMessage: `Hello! Welcome to "${client.name}", how can I help you today?`,
            backgroundColor: '#ffffff',
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: '#303235',
            botMessage: {
              backgroundColor: '#f973161a',
              textColor: '#303235',
              // showAvatar: true,
              // avatarSrc:
              //   'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png',
            },
            userMessage: {
              backgroundColor: '#f97316',
              textColor: '#ffffff',
              // showAvatar: true,
              // avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
            },
            textInput: {
              placeholder: 'Type your question',
              backgroundColor: '#ffffff',
              textColor: '#303235',
              sendButtonColor: '#f97316',
            },
          },
        }}
      />
    </>
  );
};

export default Chatbot;
