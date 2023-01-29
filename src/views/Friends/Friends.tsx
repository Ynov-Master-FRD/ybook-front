import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
} from "@mantine/core";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { rowsFriends } from "./rowsFriends";

export interface FriendsProps {
  avatar: string;
  name: string;
  job: string;
  email: string;
}

export const Friends = () => {
  const [data, setData] = useState<FriendsProps[]>([]);

  // TODO: delete this useEffect



  useEffect(() => {
    setData([
      {
        avatar: "https://i.pravatar.cc/300?img=1",
        name: "John Doe",
        job: "Frontend developer",
        email: "d@email.com",
      },
      {
        avatar: "https://i.pravatar.cc/300?img=1",
        name: "John Doe",
        job: "Frontend developer",
        email: "d@email.com",
      },
      {
        avatar: "https://i.pravatar.cc/300?img=1",
        name: "John Doe",
        job: "Frontend developer",
        email: "d@email.com",
      },
      {
        avatar: "https://i.pravatar.cc/300?img=1",
        name: "John Doe",
        job: "Frontend developer",
        email: "d@email.com",
      },
      {
        avatar: "https://i.pravatar.cc/300?img=1",
        name: "John Doe",
        job: "Frontend developer",
        email: "d@email.com",
      },
      {
        avatar: "https://i.pravatar.cc/300?img=1",
        name: "John Doe",
        job: "Frontend developer",
        email: "d@email.com",
      },
    ]);
  }, []);

  return (
    <>
      <h1 className="text-center pt-6">Liste d'amis</h1>
      <ScrollArea>
        {/* TODO: margin à width of table  */}
        <Table sx={{ width: "100%" }} verticalSpacing="md">
          <tbody>{rowsFriends(data)}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
