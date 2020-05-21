import CharactersService from "../Services/CharactersService.js";
import store from "../store.js";

//Private
function _draw() {
  let template = "";
  let characters = store.State.characters;
  characters.forEach((ch) => (template += ch.Template));
  document.getElementById("marvelCards").innerHTML = template;
  console.log(characters);
}
console.log("controller");

function _drawSandbox() {
  let template = "";
  let myCharacters = store.State.sandboxCharacters;
  console.log(myCharacters);
  console.log("^draw sandbox");
  myCharacters.forEach((ch) => (template += ch.sandboxTemplate));
  document.getElementById("sandboxCards").innerHTML = template;
}

//Public
export default class CharactersController {
  constructor() {
    store.subscribe("characters", _draw);
    store.subscribe("offset", _draw);
    store.subscribe("sandboxCharacters", _drawSandbox);
    //store.subscribe("marvelCharacters", _drawMarvelCharacters)
    //store.subscribe("sandboxCharacters", _drawMyCharacters)
  }
  addToSandbox(id) {
    console.log(id);
    CharactersService.addToSandbox(id);
  }
  removeFromSandbox(id) {
    CharactersService.removeFromSandBox(id);
  }
  next(value) {
    CharactersService.next(value);
  }
  previous(value) {
    CharactersService.previous(value);
  }
}
