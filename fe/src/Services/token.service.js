const TokenService = {
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    },

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    },

    removeUser() {
        localStorage.removeItem("user");
    },
};
export default TokenService;