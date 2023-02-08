import { useEffect, useState } from "react";
import Post from "../../components/shared/Post";
import styles from "./Home.module.scss";

import { IPost } from "../../utils/Interface/Post";
import apiBack from "../../utils/axios-api";
import { ActionIcon, Group, Loader, Popover, TextInput, Text } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons";

const DOMPurify = require("dompurify");

const Home = () => {
  let [posts, setPosts] = useState<IPost[]>([]);
  const [isUpdate, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiBack
      .get("/post")
      .then((response) => {
        setTimeout(() => {
          setPosts(response.data);
          setIsLoading(false);
        }, 500);
      })
      .catch((error: Error) => {
        console.log(error);
      });
    setUpdate(false);
  }, [isUpdate]);

  return (
    <div className={styles.container}>
      <h1 className="text-center pt-6">Actualités</h1>
      <Group className="mb-5">
        <TextInput
          className="flex-grow"
          placeholder="Rechercher un post..."
          radius="lg"
          icon={<IconSearch size={14} stroke={1.5} />}
          // TODO: Search bar doesn't work
        />

        <Popover position="bottom" withArrow shadow="md">
          <Popover.Target>
          <ActionIcon variant="light">
          <IconFilter size={36} stroke={1.5} />
        </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">
              C'est bien beau de filtrer, mais ça ne fonctionne pas encore
            </Text>
          </Popover.Dropdown>
        </Popover>

      </Group>

      <div className={styles.postContainer}>
        {isLoading && (
          <Loader
            className="self-center"
            color="dark"
            variant="dots"
            size="xl"
          />
        )}
        {posts &&
          posts
            .filter((post: IPost) => post.userId === 18)
            .sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((post) => (
              <Post
                key={post.id}
                id={post.id}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                userPostId={post.userId}
                firstName={post.user.firstname}
                lastName={post.user.lastname}
                likes={post.postLikes}
                nbComments={post.postComments.length}
                content={DOMPurify.sanitize(post.htmlContent)}
                date={post.createdAt}
                profilPicture={post.avatarS3Key}
                setUpdate={setUpdate}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
