import { useEffect, useState } from "react";
import Post from "../../components/shared/Post";
import styles from "./Profil.module.scss";

import { IPost } from "../../utils/Interface/Post";
import apiBack from "../../utils/axios-api";

const DOMPurify = require('dompurify');

const Home = () => {

    let [posts, setPosts]= useState([]);


    useEffect(() => {
        apiBack.get('/post')
        .then((response) => {
            setPosts(response.data);
            console.log(response.data);
        })
        .catch((error:Error) => {
            console.log(error);
        })
        
    },[]);

    return (
        <div className="relative">
            <div className={styles.container}>
                <h2 className="text-center">Vos Post</h2>
                <div className={styles.postContainer}>
                    {posts?
                        posts.map((post:IPost) => (
                            <Post 
                            firstName={post.user.firstname} 
                            lastName={post.user.lastname} 
                            nbComments={post.postComments.length} 
                            nbLikes={post.postLikes.length} 
                            content={DOMPurify.sanitize(post.htmlContent)} 
                            date={post.createdAt}
                            profilPicture={post.avatarS3Key}
                            />
                        )):
                        <p>No Post</p> 
                    }
    
                    </div>
                </div>
            </div>
        )
    }

    export default Home;
