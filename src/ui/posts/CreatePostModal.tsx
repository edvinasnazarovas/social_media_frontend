import { ActionIcon, Button, Center, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PostDropZone from "./PostDropZone";
import { useContext, useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { createPost } from "../../utils/post";
import { toast } from "react-toastify";
import { PostContext, UserContext } from "../../App";

export default function CreatePostModal({ opened, open, close }) {
    const [media, setMedia] = useState(null);
    const [formData, setFormData] = useState({ description: "", media: media });
    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    useEffect(() => { setFormData({ ...formData, media: media }) }, [media]);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("FORM DATA ", formData);
        createPost(formData)
            .then((res) => {
                if (res.ok) {
                    toast("Post uploaded.", { type: "success" })
                    window.location.href = "/";
                } else {
                    toast("Could not upload post.", { type: "error" })
                }
            });
    };
    return (
        <Modal opened={opened} onClose={close} title="Create Post" withinPortal={false} centered>
            <Center style={{ display: "flex", flexDirection: "column" }}>
                <form onSubmit={handleSubmit}>
                    {media ? <div style={{ display: "flex", alignItems: "center" }}>{media?.name}<ActionIcon style={{ marginLeft: "10px" }}
                        variant="default"><IconTrash /></ActionIcon></div> : <PostDropZone setMedia={setMedia} />}
                    <Textarea rows={5} label="Description" style={{ width: "100%" }} onChange={handleChange}
                        name="description" />
                    <Button style={{ marginTop: "15px" }} type="submit">Create Post</Button>
                </form>
            </Center>
        </Modal>
    );
}