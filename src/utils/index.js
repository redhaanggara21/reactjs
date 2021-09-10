export const login = () => {
    localStorage.setItem("user", "user");
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const isLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.access_token) {
        return user.access_token;
    } else{
        return false;
    }
}