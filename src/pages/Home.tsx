import { useEffect } from "react";
import API_URL from "../services/api";

function Home() {

    useEffect(() => {

        const obtenerUsuarios = async () => {
            try {
                const response = await fetch(`${API_URL}/users`);

                const data = await response.json();

                console.log(data);

            } catch (error) {
                console.error(error);
            }
        };

        obtenerUsuarios();

    }, []);

    return (
        <h1>Home</h1>
    );
}

export default Home;