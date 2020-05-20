import store from "../store.js";
import Character from "../Models/Character.js";

console.log("service");

const _marvelAPI = axios.create({
  baseURL:
    "https://gateway.marvel.com:443/v1/public/characters?apikey=2148bbf76c5acd7c1b486d33517c8d71&limit=100&offset=100",
  timeout: 8000,
});

const _sandboxAPI = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/mattson/heroes",
  timeout: 15000,
});

class CharactersService {
  getMyCharacters() {
    _sandboxAPI
      .get()
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((e) => console.error(e));
  }
  getApiMarvel() {
    _marvelAPI
      .get()
      .then((res) => {
        // console.log(res.data.data.results)
        // console.log("^res.data.data.results^");

        let rawData = res.data.data.results.filter(
          (e) => e.description.length > 0
        );
        let newCharacters = rawData.map(
          (characterData) => new Character(characterData)
        );
        store.commit("characters", newCharacters);
        console.log(newCharacters);
        console.log("^character^");
      })
      .catch((e) => console.error(e));
    this.getApiMarvel();
  }
  constructor() {
    this.getApiMarvel();
    this.getMyCharacters();
  }
}

const service = new CharactersService();
export default service;
