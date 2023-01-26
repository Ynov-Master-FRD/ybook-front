import { useEffect, useState } from "react";
import Post from "../../components/shared/Post";
import styles from "./Home.module.scss";

import { IPost } from "../../utils/Interface/Post";
import apiBack from "../../utils/axios-api";

const DOMPurify = require("dompurify");

const Home = () => {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    apiBack
      .get("/post")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className="text-center pt-6">Actualités</h1>
      <div className={styles.postContainer}>
        {posts && posts.map((post: IPost) => (
            <Post
              key={post.id}
              id={post.id}
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
