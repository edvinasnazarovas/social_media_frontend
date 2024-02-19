import { Avatar, Center, Group, Menu, Modal, UnstyledButton } from "@mantine/core";
import { UserButton } from "./UserButton";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { Logout } from "../../utils/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useDisclosure } from "@mantine/hooks";
import UserSettings from "./UserSettings";

export default function UserMenu({ user_obj, settingsOpen }) {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        Logout()
            .then((res) => {
                setUser(null);
            });
    }

    return (
        <>
            
            <Menu withArrow>
                <Menu.Target>
                    <UserButton image={user_obj.image} name={user_obj.username} email={user_obj.email} icon={user_obj.icon} />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>User</Menu.Label>
                    <Menu.Item leftSection={<IconSettings style={{ width: "15", height: "15" }} />} onClick={settingsOpen}>
                        Settings
                    </Menu.Item>
                    <Menu.Item leftSection={<IconLogout style={{ width: "15", height: "15" }} />} onClick={handleLogout}>
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>

    );
}