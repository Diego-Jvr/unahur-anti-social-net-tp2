import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {

    const { login } = useContext(AuthContext);

    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        login({
            id: 1,
            nickName: "Diego"
        });
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