import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Comment } from "../types/Comment";
import type { Post } from "../types/Post";
import {getPostById, getPostImages, getComments} from "../services/postService";
import type { PostImage } from "../types/postImage";

function PostDetail() {

    const { id } = useParams();

    const [post, setPost] = useState<Post | null>(null);
    const [images, setImages] = useState<PostImage[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    

    useEffect(() => {

        const cargarPost = async () => {

            try {

                const data = await getPostById(Number(id));

                setPost(data);

                const postImages = await getPostImages(Number(id));

                setImages(postImages);

                const postComments = await getComments(Number(id));

                setComments(postComments);

            } catch (error) {

                console.error(error);

            }

        };

        cargarPost();

    }, [id]);

    if (!post) {
        return <p>Cargando publicación...</p>;
    }

    return (
        <>
            <h1>Detalle del Post</h1>

            <h2>{post.User.nickName}</h2>

            <p>{post.description}</p>

            <p>
                Etiquetas:
                {post.Tags.map(tag => tag.name).join(", ")}
            </p>

            <h3>Imágenes</h3>

            {images.map((image) => (

                <img
                    key={image.id}
                    src={image.url}
                    alt="Imagen del post"
                    width={250}
                />

            ))}

            <h3>Comentarios</h3>

            {comments.length === 0 ? (

                <p>No hay comentarios.</p>

            ) : (

                comments.map((comment) => (

                    <div key={comment.id}>

                        <strong>{comment.User.nickName}</strong>

                        <p>{comment.content}</p>

                        <hr />

                    </div>

                ))

            )}

        </>
    );
}

export default PostDetail;