import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  this.modalElement = document.createElement("div");
  this.modalElement.classList.add("modal");
  this.modalElement.innerHTML = `
  <div class="modal__content">
  <button class="modal__close">X</button>
  <h2 class="modal__title"></h2>
  <div class="modal__body"></div>
  </div>
  `;
  this.closeButton = this.modalElement.querySelector(".modal__close");
  this.closeButton.addEventListener("click", () => this.close());
  this.handleKeyDown = (event) => {
  if (event.code === "Escape") {
  this.close();
  }
};
}
open () {
  document.body.appendChild(this.modalElement);
  document.body.classList.add("is-modal-open");
  document.addEventListener("keydown", this.handleKeyDown);
}
setTitle(title) {
  const titleElement = this.modalElement.querySelector(".modal__title");
  titleElement.textContent = title;
}
setBody () {
  const bodyElement = this.modalElement.querySelector('.modal__body');
  bodyElement.innerHTML = '';
  bodyElement.appendChild(node);
}
close () {
  if (this.modalElement.parentNode) {
  this.modalElement.parentNode.removeChild(this.modalElement);
}
document.body.classList.remove("is-modal-open");
document.removeEventListener('keydown', this.handleKeyDown);
}
}
