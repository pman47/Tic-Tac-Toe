import api from "./api";
import TokenService from "./token.service";

const UserService = {
  async login(data) {
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

  async register(data) {
    return api.post("/user/register", data).then((response) => {
      if (response.data.data) {
        TokenService.setUser(response.data.data);
      }
      return response.data;
    });
  },

  async getUsersByEmail(email) {
    return api.get(`/user/getUsersByEmail?email=${email}`).then((response) => {
      return response.data
    });
  }
};

export default UserService;