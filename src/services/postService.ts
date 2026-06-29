import API_URL from "./api";
import type { Post } from "../types/Post";
import type { PostImage } from "../types/postImage";
import type { Comment } from "../types/Comment";

export async function getPosts(): Promise<Post[]> {

    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
        throw new Error("Error al obtener las publicaciones");
    }

    return await response.json();
}

export async function getPostById(id: number): Promise<Post> {

    const response = await fetch(`${API_URL}/posts/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la publicación");
    }

    return await response.json();
}

export async function getPostImages(postId: number): Promise<PostImage[]> {

    const response = await fetch(`${API_URL}/postimages/post/${postId}`);

    if (!response.ok) {
        throw new Error("Error al obtener las imágenes");
    }

    return await response.json();
}

export async function getComments(postId: number): Promise<Comment[]> {

    const response = await fetch(`${API_URL}/comments/post/${postId}`);

    if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
    }

    return await response.json();
}