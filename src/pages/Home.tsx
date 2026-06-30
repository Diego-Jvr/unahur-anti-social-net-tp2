import type { Post } from "../types/Post";
import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import PostCard from "../components/Postcard";

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

                <PostCard
                    key={post.id}
                    post={post}
                />

            ))}

        </>
    );
}

export default Home;