import React from "react";
import Avatar from "../../components/shared/Avatar";
import Post from "../../components/shared/Post";
import styles from "./Profil.module.scss";


const Profil = () => {

    // getUserInfo

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
                    <Post firstName="John" lastName="Doe" date="2022-12-30T23:50:21.817Z" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae." likes={245} comments={12}></Post>
                    <Post firstName="John" lastName="Doe" date="2022-05-12T23:50:21.817Z" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae." likes={245} comments={12}></Post>
                    <Post firstName="John" lastName="Doe" date="2020-05-12T23:50:21.817Z" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae." likes={245} comments={12}></Post>
                    <Post firstName="John" lastName="Doe" date="2020-05-12T23:50:21.817Z" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae." likes={245} comments={12}></Post>
                </div>
            </div>
        </div>
    )
}

export default Profil;
