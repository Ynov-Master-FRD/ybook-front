import {
  Group,
  Stack,
  Text,
  Loader,
  Divider,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconDots, IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons";
import { useEffect, useState } from "react";
import apiBack from "../../utils/axios-api";
import { IPostComment } from "../../utils/Interface/Post";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";

interface CommentsProps {
  postId: number;
}

export const Comments = (props: CommentsProps) => {
  const [comments, setComments] = useState<IPostComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  //useAuth
  const authId = 18;

  useEffect(() => {
    apiBack.get(`/postcomment/${props.postId}`).then((response) => {
      setInterval(() => {
        setComments(response.data);
        setIsLoading(false);
      }, 300);
    });
    setUpdate(false);
  }, [update]);


  return (
    <>
      <Divider
        size="xs"
        variant="dotted"
        label="Commentaires"
        className="mb-1"
      />
      <AddComment
        postId={props.postId}
        setNewComment={setUpdate}
      ></AddComment>

      {isLoading ? (
        <Loader className="self-center" color="dark" variant="dots" size="sm" />
      ) : (
        <Stack spacing="xs" className="mt-2">
          {comments.map((comment:IPostComment) => (
           <Comment
              key={comment.id}
              setUpdate={setUpdate}
              comment={comment}
           ></Comment>
          ))}
        </Stack>
      )}
    </>
  );
};