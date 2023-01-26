import { Group, Stack, Text, Loader, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import apiBack from "../../utils/axios-api";
import { IPostComment } from "../../utils/Interface/Post";

interface CommentsProps {
  postId: number;
}

export const Comments = (props: CommentsProps) => {
  const [comments, setComments] = useState<IPostComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiBack.get(`/postcomment/${props.postId}`).then((response) => {
      setInterval(() => {
        setComments(response.data);
        setIsLoading(false);
      }, 300);
    });
  }, []);

  return (
    <>
      <Divider
        size="xs"
        variant="dotted"
        label="Commentaires"
        className="mb-1"
        />

      {isLoading ? (
        <Loader className="self-center" color="dark" variant="dots" size="sm" />
      ) : (
        <Stack spacing="xs">
          {comments.map((comment) => (
            <Group className="gap-0">
              <Text>
                <span className="font-bold">{comment.user.firstname} :</span>{" "}
                {comment.text}
              </Text>
            </Group>
          ))}
        </Stack>
      )}
    </>
  );
};
