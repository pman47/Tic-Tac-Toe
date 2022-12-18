import api from "./api";

const gameService = {
  async fetchGames(userId) {
    console.log('USERID', userId)
    return api.get(`/board/boards?userId=${userId}`).then((response) => {
      return response.data;
    });
  },

  async newGame(data) {
    console.log('DATA', data)
    return api.post("/board/new", data).then((response) => {
      return response.data;
    });
  },
};

export default gameService;