import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Profile() {

    const { user, logout } = useContext(AuthContext);
    
    <button onClick={logout}>
    Cerrar sesión
    </button>

    return (
        <>
            <h1>Perfil</h1>
            <button onClick={logout}>
                Cerrar sesión
            </button>
            <p>Usuario: {user?.nickName}</p>
        </>
    );
}


export default Profile;