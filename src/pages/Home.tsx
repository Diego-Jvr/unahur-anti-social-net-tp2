import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import type { Post } from "../types/Post";

function Home() {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {

        const cargarPosts = async () => {

            try {

                const data = await getPosts();

                setPosts(data);

            } catch (error) {

                console.error(error);

            }

        };

        cargarPosts();

    }, []);

    return (
        <>
            <h1>Home</h1>

            {posts.map((post) => (
                <div key={post.id}>

                    <h3>{post.User.nickName}</h3>

                    <p>{post.description}</p>

                    <p>
                        Etiquetas:
                        {" "}
                        {post.Tags.map(tag => tag.name).join(", ")}
                    </p>

                    <hr />

                </div>
            ))}

        </>
    );
}

export default Home;