import { ActionIcon, Textarea } from "@mantine/core";
import {
  IconArrowRight, IconMailFast
} from "@tabler/icons";
import { useState } from "react";
import apiBack from "../../utils/axios-api";
import { IPostComment } from "../../utils/Interface/Post";

interface AddCommentProps {
  postId: number;
  setNewComment: (value: boolean) => void;
}

export function AddComment(props: AddCommentProps) {
  const [value, setValue] = useState<string>("");

  //useAuth
  const authId = 18;

  const handleSubmit = () => {
      apiBack
        .post(`/postcomment`, {
          postId: props.postId,
          userId: authId,
          text: value,
        })
        .then((response) => {
          console.log(response);
          props.setNewComment(true);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <Textarea
      rightSection={
        <ActionIcon
          size={34}
          radius="xl"
          color="green" 
          variant="filled"
          className="self-start mt-3"
          disabled={!value}
          onClick={() => handleSubmit()}
        >
          <IconMailFast color="black" size={24} stroke={1.5} />
        </ActionIcon>
      }
      rightSectionWidth={26}
      placeholder="Ajouter un commentaire"
      variant="unstyled"
      className="w-full h-10 mb-4"
      size="md"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
