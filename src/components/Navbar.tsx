import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    return (

        <nav>

            <Link to="/">Inicio</Link>

            {" | "}

            {!user ? (

                <>

                    <Link to="/login">Iniciar Sesión</Link>

                    {" | "}

                    <Link to="/register">Registrarse</Link>

                </>

            ) : (

                <>

                    <Link to="/create-post">Crear Post</Link>

                    {" | "}

                    <Link to="/profile">Mi Perfil</Link>

                    {" | "}

                    <button onClick={logout}>
                        Cerrar Sesión
                    </button>

                </>

            )}

        </nav>

    );

}

export default Navbar;