import api from "./api";
import TokenService from "./token.service";

const UserService = {
  login(data) {
    return api.post("/user/login", data).then((response) => {
      if (response.data) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
  },

  logout() {
    TokenService.removeUser();
  },

  register(data) {
    return api.post("/user/register", data).then((response) => {
      if (response.data) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
  },
};

export default UserService;