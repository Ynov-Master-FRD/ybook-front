import { ActionIcon, Avatar, Container, Group, Text, TextInput, useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiBack from "../../utils/axios-api";
import { IConversation, IConversationMessage } from "../../utils/Interface/Conversation";



export const ConversationDetail: React.FC = () => {
    const [conversationMessages, setConversationMessages] = useState<IConversationMessage[]>([]);
    const [conversation, setConversation] = useState<IConversation>(null as any);
    const [ConversationReady, setConversationReady] = useState<boolean>(false);
    const userId = 20
    const { idConversation } = useParams<Record<string, string>>();

    const theme =  useMantineTheme();
    useEffect(() => {
        console.log(idConversation);
        
        apiBack.get(`user/${userId}/conversations/${idConversation}`)
            .then((response) => {
                setConversation(response.data);
                console.log(response.data);
                
                setConversationReady(true);
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }, [idConversation]);

    useEffect(() => {
        if (ConversationReady === false) return;
        setConversationMessages(conversation.messages);
    }, [ConversationReady]);



  return (
    <div>
      <h1>ConversationDetail</h1>
        <div className="flex flex-col h-full p-4">
      {
            conversationMessages && conversationMessages.length > 0 ? conversationMessages.map((message) => {
                if(message.userId === userId) {
                    return (
                        <Group key={message.id}  position="right">
                            <div>
                                <Text color="dimmed" size="xs">{new Date(message.createdAt).toDateString()} {new Date(message.createdAt).toLocaleTimeString()}</Text>
                                <div className={'p-3 rounded-xl'} style={{backgroundColor: 'coral'}}>
                                    <Text>{message.content}</Text>
                                </div>
                            </div>
                        </Group>
                    )
                }else{
                    return (
                        <Group key={message.id}  position="left">
                            <Avatar radius="xl" />
                            <div>
                                <Text color="dimmed" size="xs">{new Date(message.createdAt).toDateString()} {new Date(message.createdAt).toLocaleTimeString()}</Text>
                                <div className={'p-3 rounded-xl bg-blue'} style={{backgroundColor: '#228be6'}}>
                                    <Text>{message.content}</Text>
                                </div>
                            </div>
                        </Group>
                    )
                }
            }) : <div>Aucun messages</div>
      }
      <TextInput
      className="mt-4"
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Répondre"
      rightSectionWidth={42}
    />
      </div>
    </div>
  );
};
