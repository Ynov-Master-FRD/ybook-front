import { Group, ActionIcon, Menu, Text, Badge } from "@mantine/core";
import { IconDots, IconTrash, IconUserOff, IconMessage, IconUserPlus, IconUserX } from "@tabler/icons";
import React, { useState } from "react";
import { IFriendship } from "../../utils/Interface/Friendship";
import { IUser } from "../../utils/Interface/User";

export const rowsFriends = (data: IFriendship[]) => {

  const _menuFriend = (friend: IUser) => {
    return (
      <Group spacing={0} position="right">
        <ActionIcon radius="md" variant="light">
          <IconMessage size={16} stroke={1.5} />
        </ActionIcon>
        <Menu transition="pop" withArrow position="left">
          <Menu.Target>
            <ActionIcon>
              <IconDots size={16} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconUserOff size={16} stroke={1.5} />}
              color="red"
            >
              Bloquer
            </Menu.Item>
            <Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red">
              Supprimer
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    );
  };

  const _menuIncognito = (item: IFriendship) => {
    return (
      <Group spacing="xs" position="right">
        <Badge color={item.status.toString()==="PENDING" ? "blue" : "yellow"}  size="xs" radius="sm">{item.status}</Badge>
      </Group>
    );
  };

  const _menuNotifFriendship = (item: IFriendship) => {
    return (
      <Menu transition="pop" withArrow position="left">
          <Menu.Target>
            <ActionIcon>
              <IconDots size={16} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconUserPlus size={16} stroke={1.5} />}
              color="green"
            >
              Accepter
            </Menu.Item>
            <Menu.Item icon={<IconUserX size={16} stroke={1.5} />} color="orange">
              Ignorer
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>);
  };

  return data.map((item) => (
    <tr key={item.to.email}>
      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {item.to.firstname}
            </Text>
            <Text color="dimmed" size="xs">
              {item.to.lastname}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">{item.to.email}</Text>
      </td>
      <td>
        {item.status.toString()==="ACCEPTED" ? _menuFriend(item.to) : _menuIncognito(item)}
      </td>
    </tr>
  ));
};
