import type { Post } from "../types/Post";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/postService";


function Profile() {

    const { user, logout } = useContext(AuthContext);
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
    
    <button onClick={logout}>
    Cerrar sesión
    </button>

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

                    <div key={post.id}>

                        <p>{post.description}</p>

                        <hr />

                    </div>

                ))
            )}
        </>
    );
}


export default Profile;