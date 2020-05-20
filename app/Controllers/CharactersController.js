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

//Public
export default class CharactersController {
  constructor() {
    store.subscribe("characters", _draw);
    //store.subscribe("marvelCharacters", _drawMarvelCharacters)
    //store.subscribe("sandboxCharacters", _drawMyCharacters)
  }
}
