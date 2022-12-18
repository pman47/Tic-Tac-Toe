import api from "./api";

const gameService = {
  async fetchGames(userId) {
    console.log('USERID', userId)
    return api.get(`/board/boards?userId=${userId}`).then((response) => {
      return response.data;
    });
  },

  register(data) {
    return api.post("/user/register", data).then((response) => {
      return response.data;
    });
  },
};

export default gameService;