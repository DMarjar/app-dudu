// Función para decodificar el token JWT
const decodeToken = () => {
    const token = localStorage.getItem('id_token');
    if (!token) return null;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );

    return JSON.parse(jsonPayload);
}

// Función para obtener el ID del usuario
const getUserId = () => {
    const token = decodeToken();
    return token ? token.sub : null;
}

// Función para obtener el correo del usuario
const getUserEmail = () => {
    const token = decodeToken();
    return token ? token.email : null;
}

// Función para obtener el nombre de usuario
const getUsername = () => {
    const token = decodeToken();
    return token ? token["cognito:username"] : null;
}



// Exportar funciones
export { getUserId, getUserEmail, getUsername };