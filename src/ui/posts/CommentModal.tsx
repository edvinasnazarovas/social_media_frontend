import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ActionIcon, Center, Portal } from '@mantine/core';
import { IconMessageCircle } from '@tabler/icons-react';

export default function CommentModal() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication" centered withinPortal={false}>
                <Center>

                </Center>
            </Modal>
            <ActionIcon variant="default" onClick={open}><IconMessageCircle /></ActionIcon>
        </>
    );
}