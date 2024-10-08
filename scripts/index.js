// Functions for handling modals and closing them
function closePopupOnOverlayClick(popupEl) {
  popupEl.addEventListener("mousedown", (e) => {
    if (e.target === popupEl) {
      closeModal(popupEl);
    }
  });
}

function enablePopupOverlayClose() {
  const popupEls = [...document.querySelectorAll(".modal")];
  popupEls.forEach((popupEl) => {
    closePopupOnOverlayClick(popupEl);
  });
}

function handleEscKey(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

function enableEscClose() {
  document.addEventListener("keydown", handleEscKey);
}

enablePopupOverlayClose();

// Cards and other DOM manipulations
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const photoCardModal = document.querySelector("#photo-card-modal");
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton =
  editProfileModal.querySelector("#profile-close-btn");
const addCardModalCloseButton =
  addCardModal.querySelector("#profile-close-btn");
const photoCardModalCloseButton = photoCardModal.querySelector(
  "#photo-card-close-btn"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescriptionInput = document.querySelector(
  "#edit-profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const photoCardImage = document.querySelector("#photo-card-image");
const photoCardDescription = document.querySelector("#photo-card-description");

// Form data
const profileEditTitleInput = document.querySelector(
  "#edit-profile-title-input"
);
const profileDescription = document.querySelector(".profile__description");
const cardTitleInput = cardForm.querySelector(".modal__input_type_title");
const cardUrlInput = cardForm.querySelector(".modal__input_type_url");

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
}

function openFormModal(modal) {
  openModal(modal);
  const form = modal.querySelector(".modal__form");
  if (form) {
    const inputEls = [...form.querySelectorAll(config.inputSelector)];
    const submitButton = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputEls, submitButton, config.inactiveButtonClass);
  }
}

function toggleButtonState(inputEls, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", () => {
    photoCardImage.src = cardData.link;
    photoCardImage.alt = cardData.name;
    photoCardDescription.textContent = cardData.name;
    openModal(photoCardModal);
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const urlValue = cardUrlInput.value;
  renderCard({ name: titleValue, link: urlValue }, cardsWrap);
  closeModal(addCardModal);
  cardForm.reset();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileEditTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openFormModal(editProfileModal);
});

// Universal handler for closing modals
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// form listeners
profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);

// add new card button
addNewCardButton.addEventListener("click", () => openFormModal(addCardModal));

// Initial render of cards
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
