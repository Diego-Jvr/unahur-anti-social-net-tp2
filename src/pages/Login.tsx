import type { User } from "../types/User";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../services/api";

import "../styles/Forms.css";

function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [Usuario, setNickName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {

            const response = await fetch(`${API_URL}/users`);


            const users: User[] = await response.json();

            
            const user = users.find(
                (u) => u.nickName === Usuario
            );

            
            if (user && password === "123456") {
                login(user);
                navigate("/profile");
            } else {
                alert("Usuario o contraseña incorrectos");
            }

        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor");
        }
    };

    return (
        <>
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Usuario"
                value={Usuario}
                onChange={(e) => setNickName(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Iniciar sesión
            </button>
        </>
    );
}

export default Login;