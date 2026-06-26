import { useEffect } from "react";
import API_URL from "../services/api";

function Home() {

    useEffect(() => {

        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });

    }, []);

    return (
        <h1>Home</h1>
    );
}

export default Home;