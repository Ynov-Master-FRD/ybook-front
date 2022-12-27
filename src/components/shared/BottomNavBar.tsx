import React from "react";
import IconNavbar from "./IconNavBar";

const BottomNavBar = () => {

    return (
        <div className="h-20 bg-grey absolute bottom-0 w-screen">
            <div className="flex justify-around items-center h-full">
                <IconNavbar path="../assets/icon/Home.svg" name="Home" link="/register"></IconNavbar>
                <IconNavbar path="../assets/icon/Message.svg" name="Message" link="/messages"></IconNavbar>
                <IconNavbar path="../assets/icon/FAB.svg" name="Add Post" link="/add-post"></IconNavbar>
                <IconNavbar path="../assets/icon/People.svg" name="People" link="/people"></IconNavbar>
                <IconNavbar path="../assets/icon/Profil.svg" name="Parameters" link="/profil"></IconNavbar>
            </div>
        </div>

    
    )
}

    export default BottomNavBar;