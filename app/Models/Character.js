export default class Character {
  constructor(data) {
    //console.log("model");
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.imgUrl =
      data.thumbnail.path + "." + data.thumbnail.extension ||
      "//placehold.id/200x200";
  }

  get Template() {
    return /*html*/ `
    <!-- CARD TEMPLATE API -->
    <div class="card shadow border-warning m-2">
      <img
        src="//placehold.it/200x200"
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
        <p class="small text-muted mb-0">#${this.id}</p>
      </div>
    </div>
    <!-- END CARD TEMPLATE -->
    `;
  }
}
