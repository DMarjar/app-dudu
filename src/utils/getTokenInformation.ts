const decodeToken = () => {
    // Get the token from local storage
    const token = localStorage.getItem('id_token');
    if (!token) return null;

    // Decode the token
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    // Return the decoded token
    return JSON.parse(jsonPayload);
}

const getUserId = () => {
    const token = decodeToken();
    if (!token) return null;
    return token.sub;
}

const getUserEmail = () => {
    const token = decodeToken();
    if (!token) return null;
    return token.email;
}

const getUsername = () => {
    const token = decodeToken();
    if (!token) return null;
    return token["cognito:username"];
}

export {getUserId, getUserEmail, getUsername};