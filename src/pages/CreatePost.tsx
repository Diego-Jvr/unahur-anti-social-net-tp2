import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../services/postService";

function CreatePost() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [description, setDescription] = useState("");

    const handleCreatePost = async () => {

        if (!user) return;

        if (!description.trim()) {

            alert("Escribí una descripción");

            return;

        }

        try {

            await createPost(description, user.id);

            alert("Publicación creada");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("No se pudo crear la publicación");

        }

    };

    return (

        <>

            <h1>Nueva publicación</h1>

            <textarea

                placeholder="¿Qué estás pensando?"

                value={description}

                onChange={(e) => setDescription(e.target.value)}

            />

            <br />

            <button onClick={handleCreatePost}>

                Publicar

            </button>

        </>

    );
}

export default CreatePost;