import { ActionIcon, Modal } from "@mantine/core";
import React, { useState } from "react";
import IconNavbar from "../IconNavBar";
import InputPost from "../InputPost";
import styles from "./BottomNavBar.module.scss";

import { IconPlus } from '@tabler/icons';
import AddPost from "../AddPost";

const BottomNavBar = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div className={styles.navbar}>
            <Modal title="Publier un post" opened={opened} onClose={() => setOpened(false)}>
                <AddPost></AddPost>
            </Modal>

            <div className="flex justify-around items-center h-full">
                <IconNavbar path="../assets/icon/Home.svg" name="Home" link="/home"></IconNavbar>
                <IconNavbar path="../assets/icon/Message.svg" name="Message" link="/messages"></IconNavbar>
                <ActionIcon
                    onClick={() => setOpened(true)} 
                    radius="lg" 
                    variant="filled" 
                    color="dark" 
                    size="xl" 
                    className={styles.addbutton}>
                        <IconPlus size={32} />
                </ActionIcon>
                <IconNavbar path="../assets/icon/People.svg" name="People" link="/people"></IconNavbar>
                <IconNavbar path="../assets/icon/Profil.svg" name="Parameters" link="/profil"></IconNavbar>
            </div>
        </div>   
    )
}

    export default BottomNavBar;