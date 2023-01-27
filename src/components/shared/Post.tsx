// import Avatar from './Avatar';
import {
  Text,
  Avatar,
  Group,
  Paper,
  Menu,
  ActionIcon,
  Divider,
} from "@mantine/core";
import {
  IconTrash,
  IconAlertCircle,
  IconThumbUp,
  IconMessageCircle,
  IconDotsVertical,
  IconPencil,
} from "@tabler/icons";
import { useDatePublish } from "../../hooks/useDatePublish";
import apiBack from "../../utils/axios-api";
import { useCallback, useEffect, useState } from "react";
import { Comments } from "../Comments/Comments";
import {
  PostProps,
  usePostContext,
  withPostContext,
} from "../../providers/PostProvider";

const Post = () => {
  const { post, dispatch } = usePostContext();

  const {
    id,
    content,
    createdAt,
    updatedAt,
    likes,
    userPostId,
    date,
    firstName,
    lastName,
    nbComments,
    profilPicture,
  } = post;
  const printDate = useDatePublish(date);
  const [likesNumber, setLikesNumber] = useState<number>(likes.length);
  const [displayComments, setDisplayComments] = useState(false);

  //useAuth
  const authId = 18;
  const isEdited = createdAt !== updatedAt;
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => like.userId === authId)
  );

  const handleLike = useCallback(() => {
    apiBack
      .post(`/post/like/${id}`, {
        userId: 18,
      })
      .then(
        () => {
          setIsLiked(!isLiked);
          setLikesNumber((prevState) => prevState + (isLiked ? -1 : 1));
        },
        (error) => {
          console.log(error);
        }
      );
  }, [isLiked]);

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
                {isEdited ? `${printDate} (Modifié)` : printDate}
              </Text>
            </div>
          </div>
          {authId === userPostId && (
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
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconTrash size={14} />}>
                  Éditer
                </Menu.Item>
                <Menu.Item color="red" icon={<IconPencil size={14} />}>
                  Supprimer
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
        <div
          className="text-lg mt-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Divider size="xs" variant="solid" className="my-2" />
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
          <div className="mt-3">
            <Comments postId={id}></Comments>
          </div>
        )}
      </Paper>
    </div>
  );
};

const PostWithContext = (props: PostProps) =>
  withPostContext(Post, { ...props });

export default PostWithContext;
