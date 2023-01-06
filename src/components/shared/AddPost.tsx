import { Button, Modal } from "@mantine/core";
import React, { useState } from "react";
import InputPost from "./InputPost";

const AddPost = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <InputPost></InputPost>
            <Button radius="md" size="md" color='dark'>
                Publier
            </Button>
        </div>
    )
}

export default AddPost;