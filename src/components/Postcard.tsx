import type { Post } from "../types/Post";
import { Link } from "react-router-dom";

interface PostCardProps {
    post: Post;
}

function PostCard({ post }: PostCardProps) {

    return (
        <div>

            <h3>{post.User.nickName}</h3>

            <p>{post.description}</p>

            <p>
                Etiquetas:{" "}
                {post.Tags.map(tag => tag.name).join(", ")}
            </p>

            <Link to={`/post/${post.id}`}>
                <button>Ver detalle</button>
            </Link>

            <hr />

        </div>
    );
}

export default PostCard;