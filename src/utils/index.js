export const isLogin = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return true;
    } else{
        return false;
    }
}