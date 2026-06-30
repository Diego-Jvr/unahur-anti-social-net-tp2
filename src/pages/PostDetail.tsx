import type { Comment } from "../types/Comment";
import type { Post } from "../types/Post";
import type { PostImage } from "../types/PostImage";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getPostById, getPostImages, getComments, createComment} from "../services/postService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function PostDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post | null>(null);
    const [images, setImages] = useState<PostImage[]>([]);
    const [comments, setComments] = useState<Comment[]>([]); 
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState("");
    

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

    const handleCreateComment = async () => {

        if (!user) {

            const irAlLogin = window.confirm(
                "Para agregar un comentario necesitás iniciar sesión.\n\n¿Querés ir al Login ahora?"
            );

            if (irAlLogin) {
                navigate("/login");
            }

            return;
        }

        if (!content.trim()) {

            alert("Escribí un comentario.");

            return;

        }

        try {

            await createComment(
                content,
                user.id,
                Number(id)
            );

            alert("Comentario agregado.");

            setContent("");
            
            const postComments = await getComments(Number(id));
            setComments(postComments);

        } catch (error) {

            console.error(error);

            alert("No se pudo crear el comentario.");

        }

    };

    if (!post) {
        return <p>No existe la publicacion, revisá la URL</p>;
    }

    return (
        <>
            <h1>Detalle del Post</h1>

            <h2>{post.User.nickName}</h2>

            <p>{post.description}</p>

            <p>
                Etiquetas:{" "}
                {post.Tags.length > 0
                    ? post.Tags.map(tag => tag.name).join(", ")
                    : "Sin etiquetas"}
            </p>

            <h3>
            
                Imágenes ({images.length})
            
            </h3>

                {images.length === 0 ? (

                <p>Esta publicación no tiene imágenes.</p>

            ) : (

            images.map((image) => (

                <img
                    key={image.id}
                    src={image.url}
                    alt="Imagen del post"
                    width={250}

                />
            ))

            )}

            <h3>
                
                Comentarios ({comments.length})

            </h3>

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

            <h3>Agregar comentario</h3>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribí un comentario..."
            />

            <br />

            <button onClick={handleCreateComment}>
                Comentar
            </button>

        </>
    );
}

export default PostDetail;