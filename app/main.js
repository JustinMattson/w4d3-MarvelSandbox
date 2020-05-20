import CharactersController from "./Controllers/CharactersController.js";

console.log("main");

class App {
  charactersController = new CharactersController();
}

window["app"] = new App();
