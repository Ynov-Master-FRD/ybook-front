import { useEffect, useState } from "react";
import Post from "../../components/shared/Post";
import styles from "./Home.module.scss";

import { IPost } from "../../utils/Interface/Post";
import apiBack from "../../utils/axios-api";
import { Loader } from "@mantine/core";

const DOMPurify = require("dompurify");

const Home = () => {
  let [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    apiBack
      .get("/post")
      .then((response) => {
        setInterval(() => {
          setPosts(response.data);
          setIsLoading(false);
        }, 500);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="text-center pt-6">Actualités</h1>
      <div className={styles.postContainer}>
      {isLoading && (
            <Loader className="self-center" color="dark" variant="dots" size="xl"/>
          )}
        {posts && posts.map((post) => (
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
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
