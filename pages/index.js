import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

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

enablePopupOverlayClose();

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const photoCardModal = document.querySelector("#photo-card-modal");

// Forms
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

// Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditTitleInput = document.querySelector(
  "#edit-profile-title-input"
);
const profileDescriptionInput = document.querySelector(
  "#edit-profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const photoCardImage = document.querySelector("#photo-card-image");
const photoCardDescription = document.querySelector("#photo-card-description");

// Config for validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Initialize validation
const profileFormValidator = new FormValidator(config, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

// Functions
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
}

function openFormModal(modal, validator) {
  openModal(modal);
  if (validator) {
    validator.resetValidation();
  }
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (name, link) => {
    photoCardImage.src = link;
    photoCardImage.alt = name;
    photoCardDescription.textContent = name;
    openModal(photoCardModal);
  });
  return card.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

// Reuse title and link input elements
const titleInput = cardForm.querySelector(".modal__input_type_title");
const linkInput = cardForm.querySelector(".modal__input_type_url");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const urlValue = linkInput.value;
  renderCard({ name: titleValue, link: urlValue }, cardsWrap);
  closeModal(addCardModal);
  cardForm.reset();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileEditTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openFormModal(editProfileModal, profileFormValidator);
});

addNewCardButton.addEventListener("click", () =>
  openFormModal(addCardModal, cardFormValidator)
);

profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);

const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Render initial cards
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

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
