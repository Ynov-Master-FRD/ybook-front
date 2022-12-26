import React from "react";
import Avatar from "../../components/shared/Avatar";
import styles from "./Profil.module.scss";


const Profil = () => {
    return (
        <div className={styles.banner}>
            <div>
                <h1 className={styles.titleProfil}>Votre Profil</h1>
            </div>
            <div>
                <Avatar></Avatar>
            </div>
        </div>
    )
}

export default Profil;
