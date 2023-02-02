import { ActionIcon, Avatar, Group, Text, TextInput, useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
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

    
    let inputRef = useRef<HTMLInputElement>(null);
    
    const handleSubmit = (inputRef: React.RefObject<HTMLInputElement>) => {
        const content = inputRef.current?.value;
        if (content === '') return;
        apiBack.post("/user/20/messages", {
            conversationId: Number(idConversation),
            userId: userId,
            content: content,
        }).then((response) => {
            console.log(response.data);
            setConversationMessages([...conversationMessages, response.data]);
            inputRef.current!.value = '';
        })
        .catch((error: Error) => {
            console.log({
              conversationId: idConversation,
              userId: userId,
              content: content,
          })
            console.log(error);
        });
      };

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
        <div className="flex flex-col h-full p-4 pb-20 gap-2.5">
          <Text className="p-4" size="xl" weight={700}>{'Conversation détail'}</Text>
      {
            conversationMessages && conversationMessages.length > 0 ? conversationMessages.map((message) => {
                if(message.userId === userId) {
                    return (
                        <Group key={message.id}  position="right">
                            <div className="max-w-[80%]">
                                <Text className="text-right" color="dimmed" size="xs">{new Date(message.createdAt).toDateString()} {new Date(message.createdAt).toLocaleTimeString()}</Text>
                                <div className={'p-3 rounded-xl'} style={{backgroundColor: 'coral'}}>
                                    <Text className="word-break: break-all">{message.content}</Text>
                                </div>
                            </div>
                        </Group>
                    )
                }else{
                    return (
                        <Group key={message.id} noWrap={true}  position="left" spacing={0}>
                            <Avatar radius="xl" />
                            <div className="max-w-[80%]">
                                <Text color="dimmed" size="xs">{new Date(message.createdAt).toDateString()} {new Date(message.createdAt).toLocaleTimeString()}</Text>
                                <div className={'p-3 rounded-xl bg-blue'} style={{backgroundColor: '#228be6'}}>
                                    <Text className="word-break: break-all">{message.content}</Text>
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
      ref={inputRef}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={()=>handleSubmit(inputRef)} >
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
