export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );

    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () =>
      likeButton.classList.toggle("card__like-button_is-active")
    );

    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    const cardTitle = this._cardElement.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
