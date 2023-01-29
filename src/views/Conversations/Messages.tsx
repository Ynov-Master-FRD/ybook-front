import { useEffect, useState } from "react";
import apiBack from "../../utils/axios-api";
import { useConversationContext } from "../../providers/ConversationProvider";
import { IConversation } from "../../utils/Interface/Conversation";
import {
  TextInput,
  ActionIcon,
  Group,
  Menu,
  Text,
  Avatar,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconPencil,
  IconSearch,
  IconTrash,
} from "@tabler/icons";

export const Messages: React.FunctionComponent = () => {
  const userId = 20;
  const { conversations } = useConversationContext();
  const { setConversations } = useConversationContext();
  const [conversationsReady, setConversationsReady] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredConversations, setFilteredConversations] = useState<
    IConversation[]
  >([]);

  useEffect(() => {
    apiBack
      .get("/user/20/conversations")
      .then((response) => {
        setConversations(response.data);
        console.log(conversations);
        setFilteredConversations(response.data);
        setConversationsReady(true);
      })
      .catch((error: Error) => {
        console.log(Error);
      });
  }, [conversationsReady]);

  useEffect(() => {
    if (conversationsReady === false) return;
    setFilteredConversations(
      conversations.filter((conversation: IConversation) => {
        return (
          conversation.from.firstname
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          conversation.from.lastname
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      })
    );
  }, [search, conversations]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const conversationName = (conversation: IConversation) => {
    if (conversation.from.id === userId) {
      return conversation.to.firstname + " " + conversation.to.lastname;
    } else {
      return conversation.from.firstname + " " + conversation.from.lastname;
    }
  };

  const handleNewConversation = () => {
    // TODO: create a new conversation
  };

  const handleSelectConversation = (conversationId: number) => {
    // TODO: select a conversation
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <Text className="p-4" size="xl" weight={700}>
        Mes messages
      </Text>
      <div className="p-4 flex justify-between items-center">
        <TextInput
          icon={<IconSearch size={18} stroke={1.5} />}
          radius="xl"
          size="md"
          placeholder="Rechercher une conversation"
          rightSectionWidth={42}
          className="w-full"
          onChange={handleSearch}
          value={search}
        />
      </div>
      <div className="overflow-y-auto flex flex-col">
        {filteredConversations.map((conversation) => (
          <Group
            className="cursor-pointer"
            position="apart"
            key={conversation.id}
          >
            <div
              className="flex no-wrap gap-3"
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <Avatar radius="xl" />
              <div>
                <Text size="md">{conversationName(conversation)}</Text>
                <Text size="sm" color="dimmed">
                  {conversation.messages.length > 0
                    ? conversation.messages[0].content
                    : ""}
                </Text>
              </div>
            </div>
          </Group>
        ))}
      </div>
    </div>
  );
};
