import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/api";

function Register() {

    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const handleRegister = async () => {

        if (!nickName || !email) {
            alert("Completa todos los campos");
            return;
        }

        try {

            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nickName,
                    email
                })
            });

            if (!response.ok) {
                throw new Error("Error al crear usuario");
            }

            alert("Usuario registrado correctamente");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert("No se pudo registrar el usuario");

        }
    };

        return (
        <>
            <h1>Registro</h1>

            <input
                type="text"
                placeholder="Nickname"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <button onClick={handleRegister}>
                Registrarse
            </button>
        </>
    );
}

export default Register;