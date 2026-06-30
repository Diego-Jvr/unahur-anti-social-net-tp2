import API_URL from "./api";
import type { Post } from "../types/Post";
import type { PostImage } from "../types/PostImage";
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

    export async function createPost(
        description: string,
        userId: number,
        tagIds: number[]
    ): Promise<Post> {

    const response = await fetch(`${API_URL}/posts`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            description,
            userId,
            tagIds
        })

    });

    if (!response.ok) {
        throw new Error("Error al crear la publicación");
    }

    return await response.json();
}

export async function createComment(
    content: string,
    userId: number,
    postId: number
) {

    const response = await fetch(`${API_URL}/comments`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            content,
            userId,
            postId
        })

    });

    if (!response.ok) {
        throw new Error("Error al crear el comentario");
    }

    return await response.json();

}