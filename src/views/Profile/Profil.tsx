import { useEffect, useState } from "react";
// import Avatar from "../../components/shared/Avatar";
import Post from "../../components/shared/Post";
import styles from "./Profil.module.scss";

import { IPost } from "../../utils/Interface/Post";
import apiBack from "../../utils/axios-api";
import { Avatar, Loader } from "@mantine/core";

const DOMPurify = require("dompurify");

const Profil = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //useAuth

  useEffect(() => {
    apiBack
      .get("/post")
      .then((response) => {
        setInterval(() => {
          setPosts(response.data);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="relative">
      <div className={styles.banner}>
        <div className="absolute left-4 -bottom-8 rounded-full bg-white">
          <Avatar size="xl" color="gray" className="rounded-full" />
        </div>
        <div className="absolute top-2/3 left-1/4">
          <span className="text-4xl font-semibold text-white">John Doe</span>
        </div>
      </div>
      <div className={styles.container}>
        <h2 className="text-center">Vos Post</h2>
        <div className={styles.postContainer}>
          {isLoading && (
            <Loader className="self-center" color="dark" variant="dots" size="xl"/>
          )}
          {posts ? (
            posts
              .filter((post: IPost) => post.userId === 18)
              .map((post: IPost) => (
                <Post
                  key={post.id}
                  userPostId={post.userId}
                  id={post.id}
                  firstName={post.user.firstname}
                  lastName={post.user.lastname}
                  date={post.createdAt}
                  nbComments={post.postComments.length}
                  likes={post.postLikes}
                  content={DOMPurify.sanitize(post.htmlContent)}
                  profilPicture={post.avatarS3Key}
                />
              ))
          ) : (
            <p>Vous n'avez pas encore de publication</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
