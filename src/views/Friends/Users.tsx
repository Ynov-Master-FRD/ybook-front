import { Center } from "@mantine/core";
import { useState, useEffect } from "react";
import apiBack from "../../utils/axios-api";
import { IUser } from "../../utils/Interface/User";
import { SearchUser } from "./SearchUser";

export const Users = () => {
    const [data, setData] = useState<IUser[]>([]);
    useEffect(() => {
      apiBack.get("/user").then((response) => {
        setData(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }, []);
    return (
        <Center className="flex flex-col">
            <h1 className="mt-5">Rechercher un utilisateur</h1>
            <SearchUser data={data}></SearchUser>
        </Center>
    )
}

            