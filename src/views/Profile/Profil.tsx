import React from "react";
import Avatar from "../../components/shared/Avatar";
import Post from "../../components/shared/Post";
import styles from "./Profil.module.scss";


const Profil = () => {

    // getUserInfo
    const FakerPost = {
        firstName: "John",
        lastName: "Doe",
        date: "2021-05-01T00:00:00.000Z",
        content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl sit amet ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
        nbComments: 0,
        nbLikes: 0,
    }

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
                    <Post {...FakerPost}></Post>
                    <Post {...FakerPost}></Post>
                    <Post {...FakerPost}></Post>
                    <Post {...FakerPost}></Post>
                    <Post {...FakerPost}></Post>
                    
                </div>
            </div>
        </div>
    )
}

export default Profil;
