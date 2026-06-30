import type { Post } from "../types/Post";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/postService";
import PostCard from "../components/Postcard";

function Profile() {

    const { user } = useContext(AuthContext);
    const [myPosts, setMyPosts] = useState<Post[]>([]);

    useEffect(() => {

        const cargarPosts = async () => {

            if (!user) return;

            try {

                const posts = await getPosts();

                const filteredPosts = posts.filter(

                    (post) => post.UserId === user.id

                );

                setMyPosts(filteredPosts);

            } catch (error) {

                console.error(error);

            }

        };

        cargarPosts();

    }, [user]);

    if (!user) {

        return <p>No hay usuario logueado.</p>;

    }

    return (

        <>

            <h1>Mi Perfil</h1>

            <p>

                <strong>Nickname:</strong> {user.nickName}

            </p>

            <p>

                <strong>Email:</strong> {user.email}

            </p>

            <hr />

            <h2>Mis publicaciones</h2>

            {myPosts.length === 0 ? (

                <p>No hiciste publicaciones todavía.</p>

            ) : (

                myPosts.map((post) => (

                    <PostCard
                        key={post.id}
                        post={post}
                    />

                ))
            )}
        </>
    );
}


export default Profile;