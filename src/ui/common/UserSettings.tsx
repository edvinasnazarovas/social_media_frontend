import { Button, Center, Fieldset, Modal, UnstyledButton } from "@mantine/core";
import ProfileUploadZone from "./ProfileUpload";
import { useContext, useEffect, useState } from "react";
import { uploadUserIcon } from "../../utils/user";
import { toast } from "react-toastify";
import { IconTrash } from "@tabler/icons-react";
import { UserContext } from "../../App";

export default function UserSettings({ opened, open, close, user }) {
    const [icon, setIcon] = useState(null);
    const { setUser } = useContext(UserContext);

    const handleIcon = () => {
        if (!icon) {
            return;
        }
        uploadUserIcon(icon)
            .then((res) => {
                if (res) {
                    toast("Icon uploaded.", { type: "success" })
                    setUser({ ...user, icon: res });
                    setIcon(null);
                } else {
                    toast("Failed to upload icon.", { type: "error" })
                }
            })
    };

    const handleRemove = () => {
        setIcon(null);
    }

    useEffect(() => {
        console.log("ICON ", icon)
    }, [icon])

    return (
        <Modal opened={opened} onClose={close} withCloseButton={false} centered withinPortal={false}>
            <Center>
                <Fieldset legend="User Icon"
                    style={icon ? { display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" } : null}>
                    {!icon ?
                        <ProfileUploadZone setIcon={setIcon} /> :
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {icon.name}<UnstyledButton onClick={handleRemove}><IconTrash /></UnstyledButton>
                        </div>}
                    <Button disabled={!icon} onClick={handleIcon}>Submit</Button>
                </Fieldset>
            </Center>
        </Modal>
    );
}