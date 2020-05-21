import store from "../store.js";
import Character from "../Models/Character.js";

console.log("service");

let _offset = 0;

const _marvelAPI = axios.create({
  baseURL:
    //"https://gateway.marvel.com:443/v1/public/characters?apikey=0a085765f533ed43cb533c66ed2c2d20&limit=100&offset=100", // Justin
    //"https://gateway.marvel.com/v1/public/characters?apikey=53496df3cd682930aa9108759e347171&limit=100", // MARK
    "https://gateway.marvel.com:443/v1/public/characters?apikey=2148bbf76c5acd7c1b486d33517c8d71&limit=100", // TIM
  //timeout: 8000,
});

const _sandboxAPI = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/mattson/heroes",
  //timeout: 15000,
});

class CharactersService {
  previous(value) {
    console.log(value);
    if (_offset <= 100) {
      _offset = 0;
      console.log(_offset);
    } else {
      _offset -= value;
      console.log(_offset);
    }
    store.commit("offset", _offset);
    this.getApiMarvel();
    console.log(store.State.offset);
    console.log("^store offset");
  }
  next(value) {
    console.log(value);
    console.log(store.State.offset);
    _offset += value;
    console.log(_offset);
    store.commit("offset", _offset);
    this.getApiMarvel();
    console.log(store.State.offset);
    console.log("^store offset");
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
      .get(`&offset=${_offset}`)
      .then((res) => {
        console.log(res.data.data.results);
        console.log("^res.data.data.results^");
        let rawData = res.data.data.results.filter(
          (e) => e.description.length > 0
        );
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
