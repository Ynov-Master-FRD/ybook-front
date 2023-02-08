import { ScrollArea, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import apiBack from "../../utils/axios-api";
import { IFriendship } from "../../utils/Interface/Friendship";
import { rowsFriends } from "./rowsFriends";

export const IgnoreFriend = () => {
  const [data, setData] = useState<IFriendship[]>([]);
  const [loading, setLoading] = useState(true);

  //useAuth
  const AuthId = 18;

  useEffect(() => {
    apiBack.get(`/friendship/ignored/${AuthId}`).then((response) => {
      setData(response.data.reverse());
      setLoading(false);
    });
  }, []);

  return (
    <ScrollArea className="pt-3 pb-20">
      <Table verticalSpacing="md">
        {data.length > 0 ? (
          <tbody>{rowsFriends(data)}</tbody>
        ) : (
          <span className="italic">Il n'y a personne ici..</span>
        )}
      </Table>
    </ScrollArea>
  );
};
