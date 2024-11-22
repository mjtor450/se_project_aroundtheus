export default class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
  }

  _showInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorEl.textContent = inputEl.validationMessage;
    errorEl.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorEl.textContent = "";
    errorEl.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _toggleButtonState(inputEls, submitButton) {
    if (inputEls.some((inputEl) => !inputEl.validity.valid)) {
      submitButton.classList.add(this._settings.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._settings.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    const inputEls = [
      ...this._formEl.querySelectorAll(this._settings.inputSelector),
    ];
    const submitButton = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState(inputEls, submitButton);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
  }
}
