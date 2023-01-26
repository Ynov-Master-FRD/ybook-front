// import Avatar from './Avatar';
import { Text, Avatar, Group, Paper, Menu, ActionIcon, Divider } from "@mantine/core";
import {
  IconTrash,
  IconAlertCircle,
  IconThumbUp,
  IconMessageCircle,
} from "@tabler/icons";
import { useDatePublish } from "../../hooks/useDatePublish";
import apiBack from "../../utils/axios-api";
import { useEffect, useState } from "react";
import { IPostLike } from "../../utils/Interface/Post";
import { Comments } from "./Comments";

interface PostProps {
  id: number;
  userPostId: number;
  firstName: string;
  lastName: string;
  date: Date;
  content: string;
  likes: IPostLike[];
  nbComments: number;
  profilPicture: string;
}

const Post = ({
  id,
  userPostId,
  firstName,
  lastName,
  date,
  content,
  likes,
  nbComments,
  profilPicture,
}: PostProps) => {
  const printDate = useDatePublish(date);
  const [likesNumber, setLikesNumber] = useState<number>(likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const [userAuthId] = useState(18);

  //useAuth

  useEffect(() => {
    apiBack.get(`/postlike/post/${id}`).then((response) => {
          setLikesNumber(response.data.length);
          response.data.forEach((like: any) => {
            if (like.userId === 18) {
              setIsLiked(true);
            }
          });
        });
  }, [isLiked]);

  const handleLike = () => {
    apiBack
      .post(`/post/like/${id}`, {
        userId: 18,
      })
      .then(
        (response) => {
          setIsLiked(!isLiked);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleComment = () => {
    setDisplayComments(!displayComments);
  };

  return (
    <div>
      <Paper withBorder radius="lg" className="py-3 px-6">
        <Group position="apart">
          <div className="flex no-wrap gap-3">
            <Avatar src={profilPicture} radius="xl" />
            <div>
              <Text size="md">
                {firstName} {lastName}
              </Text>
              <Text size="sm" color="dimmed">
                {printDate}
              </Text>
            </div>
          </div>
          {userAuthId === userPostId && (
            <Menu
              shadow="md"
              width={200}
              position="left"
              withArrow
              arrowPosition="center"
              transition="rotate-right"
              transitionDuration={150}
            >
              <Menu.Target>
                <ActionIcon size="md" variant="transparent">
                  <IconTrash size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item color="red" icon={<IconAlertCircle size={14} />}>
                  Êtes-vous sûr ?
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
        <div
          className="text-lg mt-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Divider size="xs" variant="solid" className="my-2"/>
        <div className="flex items-center gap-4 mt-1">
          <span
            className={`${
              isLiked ? "text-green" : "text-dark"
            } flex transition duration-1000 ease-in-out`}
          >
            {likesNumber}
            <ActionIcon
              onClick={handleLike}
              color={isLiked ? "green" : "dark"}
              variant="transparent"
              className="transition duration-1000 ease-in-out"
            >
              <IconThumbUp size={24} />
            </ActionIcon>
          </span>
          <span className="flex">
            {nbComments}{" "}
            <ActionIcon
              onClick={handleComment}
              color="dark"
              variant="transparent"
            >
              <IconMessageCircle size={24} />
            </ActionIcon>
          </span>
        </div>
        {displayComments && (
          <div className="mt-4">
            <Comments postId={id}></Comments>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Post;
