import { createContext, useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import { Avatar, Button, Menu, Stack, createTheme } from '@mantine/core';
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from './MainRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineProvider } from '@mantine/core';
import LoginPage from './pages/Login';
import { CheckAuth } from './utils/auth';
import UserMenu from './ui/common/UserMenu';
import UserSettings from './ui/common/UserSettings';
import Posts from './ui/posts/Posts';
import CreatePostModal from './ui/posts/CreatePostModal';
import { IconPlus } from '@tabler/icons-react';
import CommentModal from './ui/posts/CommentModal';

export const UserContext = createContext(null);
export const PostContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [opened, { toggle }] = useDisclosure();
  const [settingsOpened, { open, close }] = useDisclosure(false);
  const [createOpened, { open: createOpen, close: createClose }] = useDisclosure(false);

  useEffect(() => {
    CheckAuth()
      .then((user) => {
        setUser(user);
      });
  }, []);

  useEffect(() => {
    console.log("USER CHANGED ", user);
  }, [user])

  return (
    <>
      <MantineProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <PostContext.Provider value={{ posts, setPosts }}>
            <UserSettings opened={settingsOpened} open={open} close={close} user={user} />
            <CreatePostModal opened={createOpened} open={createOpen} close={createClose} />
            {
              user ?
                <AppShell header={{ height: 60 }}
                  footer={{ height: 60 }}
                  navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
                  aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
                  padding="md">
                  <AppShell.Header>
                    <Group h="100%" px="md">
                      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                      Social Media
                    </Group>
                  </AppShell.Header>
                  <AppShell.Navbar p="md">
                    Navbar
                    <Stack style={{ height: "70%" }}>
                      <Button variant="light" rightSection={<IconPlus />} onClick={createOpen}>Create Post</Button>
                    </Stack>
                    <Stack style={{ height: "100%" }} justify='flex-end'>
                      <UserMenu user_obj={user} settingsOpen={open} />
                    </Stack>
                  </AppShell.Navbar>
                  <AppShell.Main>
                    <Posts />
                  </AppShell.Main>
                  <AppShell.Aside p="md">Aside</AppShell.Aside>
                  <AppShell.Footer p="md">Footer</AppShell.Footer>
                </AppShell>
                :
                <LoginPage />
            }
          </PostContext.Provider>
        </UserContext.Provider>
      </MantineProvider>
      <ToastContainer position='bottom-right' />
    </>
  )
}

export default App