import { useContext, useEffect, useState } from "react";
import { Post } from "../../definitions";
import { ActionIcon, Badge, Card, Center, Group, Image, Menu, Text } from "@mantine/core";
import { deletePost, fetchPosts, likePost } from "../../utils/post";
import { PostContext, UserContext } from "../../App";
import { IconDotsVertical, IconHeart, IconHeartFilled, IconMessageCircle, IconTrash } from "@tabler/icons-react";
import UserCard from "../common/UserCard";
import { toast } from "react-toastify";
import CommentModal from "./CommentModal";

export default function Posts() {
    const { posts, setPosts } = useContext(PostContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchPosts()
            .then((posts) => {
                setPosts(posts);
            })
    }, [])

    const changeLike = (post_id: number, liked: boolean) => {
        setPosts(posts.map(post =>
            post.id === post_id ? { ...post, liked: liked, likes: liked ? post.likes + 1 : post.likes - 1 } : post
        ));
    };

    const handleDelete = (post_id: number) => {
        deletePost(post_id)
            .then((res) => {
                if (res.ok) {
                    setPosts(posts.filter(post => post.id !== post_id));
                    toast("Post deleted.", { type: "success" });
                } else {
                    toast("Unable to delete post.", { type: "error" });
                }
            })
    }

    const handleLike = (post: Post) => {
        likePost(post.id)
            .then((res) => {
                if (res.status === 200) {
                    changeLike(post.id, false);
                }
                if (res.status === 201) {
                    changeLike(post.id, true);
                }
                if (!res.ok) {
                    toast("Failed to like/unlike post", { type: "error" })
                }
            })
    }

    return (
        <div>
            {posts ?
                posts.map((post) => (
                    <Card shadow="sm" padding="lg" radius="md" withBorder key={post.id} style={{ maxWidth: "480px", marginBottom: "15px" }}>
                        <UserCard username={post.username} icon={post.icon_path} />
                        <Card.Section style={{ marginTop: "10px", }}>
                            <Image src={`${import.meta.env.VITE_API}/${post.path.replace(/\\/g, '/').replace('public/', '')}`}
                                height={500}
                            />
                        </Card.Section>
                        <Group>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <ActionIcon variant="default" onClick={() => handleLike(post)}>
                                    {post.liked ? <IconHeartFilled /> : <IconHeart />}
                                </ActionIcon>
                                <Text size="sm" c="dimmed">{post.likes}</Text>
                            </div>
                            <>{user.id === post.user_id ?
                                <Menu>
                                    <Menu.Target><ActionIcon variant="default"><IconDotsVertical /></ActionIcon></Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label>Post</Menu.Label>
                                        <Menu.Item leftSection={<IconTrash style={{ width: "15", height: "15" }} />} onClick={() => handleDelete(post.id)}>
                                            Delete
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                                : null}</>
                        </Group>
                        <div style={{ display: "flex" }}>
                            <Text size="sm" style={{ marginRight: "5px" }}>{post.username}</Text>
                            <Text size="sm" c="dimmed">{post.description}</Text>
                        </div>
                    </Card>
                ))
                : null}
        </div>
    )
}