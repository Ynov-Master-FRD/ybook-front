import React, { useEffect, useState } from "react";
import Avatar from "../../components/shared/Avatar";
import Post from "../../components/shared/Post";
import styles from "./Profil.module.scss";

import { IPost } from "../../utils/Interface/Post";
import apiBack from "../../utils/axios-api";

const Profil = () => {

    let [posts, setPosts]= useState([]);


    useEffect(() => {
        apiBack.get('/post')
        .then((response) => {
            setPosts(response.data);
        })
        .catch((error:Error) => {
            console.log(error);
        })
        
    },[]);

    return (
        <div className="relative">
            <div className={styles.banner}>
                <div className="absolute left-4 -bottom-8 rounded-full bg-white">
                    <Avatar color="#000" size="large"></Avatar>
                </div>
            </div>
            <div className="m-8">
                <span className="text-xl font-semibold">John Doe</span>
            </div>
            <div className={styles.container}>
                <h2 className="text-center">Vos Post</h2>
                <div className={styles.postContainer}>
                    {posts?
                        posts.map((post:IPost) => (
                             <Post firstName={post.user.firstname} lastName={post.user.lastname} nbComments={post.postComments.length} nbLikes={post.postLikes.length} content={post.htmlContent} date={post.createdAt}></Post>
                        )):
                        <p>Vous n'avez pas encore de post</p> 
                    }
    
                    </div>
                </div>
            </div>
        )
    }

    export default Profil;
