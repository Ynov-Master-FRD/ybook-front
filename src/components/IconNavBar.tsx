import React from "react";
import { Link } from "react-router-dom";

const IconNavbar = (children : any) => {
    return (
        <Link to={children.link}>
            <img src={children.path} alt={children.name} />
        </Link>
    )
}

export default IconNavbar;