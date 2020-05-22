import store from "../store.js";
import Character from "../Models/Character.js";

console.log("service");

let _offset = 0;

const _marvelAPI = axios.create({
  baseURL:
    // "https://gateway.marvel.com:443/v1/public/characters?apikey=0a085765f533ed43cb533c66ed2c2d20&limit=100", // Justin
    //"https://gateway.marvel.com/v1/public/characters?apikey=53496df3cd682930aa9108759e347171&limit=100", // MARK
    "https://gateway.marvel.com:443/v1/public/characters?apikey=2148bbf76c5acd7c1b486d33517c8d71&limit=100", // TIM
  //timeout: 8000,
});

const _sandboxAPI = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/mattson/heroes",
  //timeout: 15000,
});

class CharactersService {
  calculateOffset(value) {
    if (
      (value < 0 && (_offset < 100 || store.State.offset == null)) ||
      (value > 0 && (_offset >= 1400 || store.State.offset >= 1400))
    ) {
      _offset = 0;
      store.State.offset = 0;
    } else {
      _offset += value;
    }
    store.commit("offset", _offset);
  }
  previous(value) {
    this.calculateOffset(value);
    this.getApiMarvel();
  }
  // TODO something is a little buggy here
  next(value) {
    this.calculateOffset(value);
    this.getApiMarvel();
  }
  removeFromSandBox(id) {
    _sandboxAPI
      .delete(id)
      .then((res) => {
        // console.log(res.data);
        this.getMyCharacters();
      })
      .catch((e) => console.error(e));
  }
  addToSandbox(id) {
    let myNewCharacter = store.State.characters.find((c) => c.id == id);
    // console.log(myNewCharacter);
    // console.log("^char selected from Marvel AP");
    _sandboxAPI
      .post("", myNewCharacter)
      .then((res) => {
        // console.log(res);
        // console.log("^hero created");
        this.getMyCharacters();
      })
      .catch((e) => console.error(e));
  }
  getMyCharacters() {
    console.log();
    _sandboxAPI
      .get()
      .then((res) => {
        //console.log(res.data.data);
        //console.log("^res.data.data");
        let myCharacters = res.data.data.map((char) => new Character(char));
        //console.log(myCharacters);
        //console.log("^myCharacters");
        store.commit("sandboxCharacters", myCharacters);
      })
      .catch((e) => console.error(e));
  }
  getApiMarvel() {
    _marvelAPI
      .get(`&offset=${store.State.offset}`)
      .then((res) => {
        // console.log(res.data.data.results);
        // console.log("^res.data.data.results^");
        let rawData = res.data.data.results.filter(
          (e) => e.description.length > 0
        );
        console.log(rawData);

        rawData = rawData.filter(
          (e) =>
            e.thumbnail.path !=
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
        );
        rawData = rawData.filter(
          (e) =>
            e.thumbnail.path !=
            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
        );

        console.log(rawData);

        let newCharacters = rawData.map(
          (characterData) => new Character(characterData)
        );
        store.commit("characters", newCharacters);
        // console.log(newCharacters);
        // console.log("^character^");
      })
      .catch((e) => console.error(e));
  }
  constructor() {
    this.getApiMarvel();
    this.getMyCharacters();
  }
}

const service = new CharactersService();
export default service;
