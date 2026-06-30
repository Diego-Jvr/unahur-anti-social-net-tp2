import type { Tag } from "../types/Tag";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../services/postService";
import { useEffect } from "react";
import { getTags } from "../services/tagService";

function CreatePost() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);

    useEffect(() => {

    const cargarTags = async () => {

        try {

            const data = await getTags();

            setTags(data);

        } catch (error) {

            console.error(error);

        }

    };

    cargarTags();

}, []);

    const handleCreatePost = async () => {

        if (!user) return;

        if (!description.trim()) {

            alert("Escribí una descripción");

            return;

        }

        try {

            await createPost(description, user.id, selectedTags);

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

            <h3>Etiquetas</h3>

            {tags.map((tag) => (

                <div key={tag.id}>

                    <input

                        type="checkbox"

                        checked={selectedTags.includes(tag.id)}

                        onChange={(e) => {

                            if (e.target.checked) {

                                setSelectedTags([
                                    ...selectedTags,
                                    tag.id
                                ]);

                            } else {

                                setSelectedTags(

                                    selectedTags.filter(id => id !== tag.id)

                                );

                            }

                        }}

                    />

                    {tag.name}

                </div>

            ))}

        </>

    );
}

export default CreatePost;