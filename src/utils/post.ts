import { Post } from "../definitions";
import useFetch from "./utils";

export async function fetchPosts(): Promise<Post[]> {
    const res = await useFetch(`${import.meta.env.VITE_API}/api/posts`);
    if (res.ok) {
        return await res.json();
    } else {
        return [];
    }
}

export async function createPost(post: any) {
    const form_data = new FormData();
    form_data.append("description", post.description);
    form_data.append("file", post.media);
    const res = await useFetch(`${import.meta.env.VITE_API}/api/posts`, {
        method: "POST",
        body: form_data
    });
    return res;
}

export async function likePost(post_id: number) {
    const res = await useFetch(`${import.meta.env.VITE_API}/api/posts/${post_id}/like`, {
        method: "POST"
    });
    return res;
}

export async function deletePost(post_id: number) {
    const res = await useFetch(`${import.meta.env.VITE_API}/api/posts/${post_id}`, {
        method: "DELETE"
    });
    return res;
}