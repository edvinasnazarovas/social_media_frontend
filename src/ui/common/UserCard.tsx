import { Avatar, Group, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default function UserCard({username, icon} : {username: string, icon: string}) {
    return (
        <Group>
            <Avatar src={`${import.meta.env.VITE_API}/${icon ? icon.replace(/\\/g, '/').replace('public/', '') : null}`} radius="xl" />
            <div style={{ flex: 1 }}>
                <Text fw={500}>
                    {username}
                </Text>
            </div>
        </Group>
    )
}