import { Table, ScrollArea, Group, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { rowsFriends } from "./rowsFriends";
import { IconUserSearch } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

export interface FriendsProps {
  avatar: string;
  name: string;
  job: string;
  email: string;
}

export const Friends = () => {
  const [data, setData] = useState<FriendsProps[]>([]);
  const navigate = useNavigate();

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
    <div className="w-11/12 mx-auto">
      <Group position="apart">
        <h1 className="text-center pt-6">Liste d'amis</h1>
        <Button leftIcon={<IconUserSearch size={18} />} color="dark" variant="outline" onClick={() => navigate("/users")}>Rechercher</Button>
      </Group>
      <ScrollArea>
        <Table verticalSpacing="md">
          <tbody>{rowsFriends(data)}</tbody>
        </Table>
      </ScrollArea>
    </div>
  );
};
