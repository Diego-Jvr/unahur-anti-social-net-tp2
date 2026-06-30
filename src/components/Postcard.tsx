import type { Post } from "../types/Post";
import type { PostImage } from "../types/PostImage";
import type { Comment } from "../types/Comment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostImages, getComments } from "../services/postService";

import "../styles/PostCard.css";

interface PostCardProps {
    post: Post;
}

function PostCard({ post }: PostCardProps) {
    
    const [images, setImages] = useState<PostImage[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);


    useEffect(() => {
        
    const cargarDatos = async () => {

        try {

            const postImages = await getPostImages(post.id);
            setImages(postImages);

            const postComments = await getComments(post.id);
            setComments(postComments);

        } catch (error) {

            console.error(error);

        }

    };

    cargarDatos();

}, [post.id]);

    return (
        <div className="post-card">

            <h3>{post.User.nickName}</h3>

            <p>{post.description}</p>
            
            {images.length > 0 && (

            <img
                src={images[0].url}
                alt="Imagen del post"
                width={200}
            />

            )}  

            <p>
                Etiquetas:{" "}
                {post.Tags.length > 0
                    ? post.Tags.map(tag => tag.name).join(", ")
                    : "Sin etiquetas"}
            </p>

            <p>
                {comments.length} comentario{comments.length !== 1 ? "s" : ""}
            </p>    

            <Link to={`/post/${post.id}`}>
                <button>Ver más</button>
            </Link>

            <hr />

        </div>
    );
}

export default PostCard;