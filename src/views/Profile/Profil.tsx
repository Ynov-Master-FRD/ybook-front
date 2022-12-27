import React from "react";
import Avatar from "../../components/shared/Avatar";
import styles from "./Profil.module.scss";


const Profil = () => {

    // getUserInfo

    return (
        <div className={styles.banner}>
            <div>
                <h1 className={styles.titleProfil}>NOM Prénom</h1>
            </div>
            <div className="absolute left-4 top-1/5">
                <Avatar color="#000" size="large"></Avatar>
            </div>
        </div>
    )
}

export default Profil;
