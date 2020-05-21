export default class Character {
  constructor(data) {
    //console.log("model");
    this.id = data._id || data.id;
    this.name = data.name;
    this.description = data.description;
    this.img =
      data.img ||
      data.thumbnail.path + "." + data.thumbnail.extension ||
      "//placehold.id/200x200";
  }

  get Template() {
    return /*html*/ `
    <!-- CARD TEMPLATE API -->
    <div class="card shadow border-warning">
      <img
        src="${this.img}"
        class="card-img-top p-2"
        alt="..."
      />
      <div class="card-body p-2">
        <h5 class="card-title text-left text-primary">
          "${this.name}"
        </h5>
        <p class="card-text text-left">
          ${this.description}
        </p>
        <span class="d-flex justify-content-between">
        <p class="small text-muted mb-0">#${this.id}</p>
        <i class="fas fa-arrow-circle-right fa-2x action text-success" onclick="app.charactersController.addToSandbox('${this.id}')"></i>
        </span>
      </div>
    </div>
    <!-- END CARD TEMPLATE -->
    `;
  }
  get sandboxTemplate() {
    return /*html*/ `
    <!-- CARD TEMPLATE API -->
    <div class="card shadow border-warning">
      <img
        src="${this.img}"
        class="card-img-top p-2"
        alt="..."
      />
      <div class="card-body p-2">
        <h5 class="card-title text-left text-primary">
          "${this.name}"
        </h5>
        <p class="card-text text-left">
          ${this.description}
        </p>
        <p class="text-left"><i class="fas fa-arrow-circle-left fa-2x action text-danger " onclick="app.charactersController.removeFromSandbox('${this.id}')"></i></>
        <p class="small text-muted mb-0">#${this.id}</p>
      </div>
    </div>
    <!-- END CARD TEMPLATE -->
    `;
  }
}
