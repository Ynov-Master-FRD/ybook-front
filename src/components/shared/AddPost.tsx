import { Button, Modal } from "@mantine/core";
import React, { useRef, useState } from "react";
import apiBack from "../../utils/axios-api";
import InputPost from "./InputPost";

import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap"
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Highlight } from "@tiptap/extension-highlight";
import Post from "./Post";
const DOMPurify = require('dompurify');


const AddPost = () => {
    const [opened, setOpened] = useState(false);
    const [content, setContent] = useState("");

    const contentCleaner = (content: string) => {
        return DOMPurify.sanitize(content);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
            Highlight,
            Placeholder.configure({
                placeholder: 'Rédigez votre post ici...',
            }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        }
    });

    const handlePublish = () => {
        setOpened(false);
        apiBack.post('/post', {
            htmlContent: content,
            userId: 18
        })
    }

    return (
        <div className="flex flex-col gap-4">
            {/* <InputPost ref={inputPostRef}></InputPost> */}
            <div>
            <RichTextEditor editor={editor}>
                <RichTextEditor.Content />
                <RichTextEditor.Toolbar sticky stickyOffset={0}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                       <RichTextEditor.Blockquote />
                       <RichTextEditor.BulletList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                       <RichTextEditor.Link />
                       <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
            </RichTextEditor>
        </div>
            <Button radius="md" size="md" color='dark' onClick={handlePublish}>
                Publier
            </Button>
        </div>
    )
}

export default AddPost;