import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../services/api";
import type { User } from "../types/User";

function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            // 1. Pedimos todos los usuarios
            const response = await fetch(`${API_URL}/users`);

            // 2. Convertimos la respuesta a JSON
            const users: User[] = await response.json();

            // 3. Buscamos un usuario con el nickname ingresado
            const user = users.find(
                (u) => u.nickName === nickName
            );

            // 4. Validamos usuario y contraseña
            if (user && password === "123456") {
                login(user);
                navigate("/profile");
            } else {
                alert("Nickname o contraseña incorrectos");
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
                placeholder="Nickname"
                value={nickName}
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