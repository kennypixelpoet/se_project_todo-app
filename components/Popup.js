export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector); 
    }

    open() {
        this._popupElement.classList.add("popup_visible");
        document.addEventListener("keydown", this._handleEscapeClose);
    }

    close() {
        this._popupElement.classList.remove("popup_visible");
        document.removeEventListener("keydown", this._handleEscapeClose);
    }

    _handleEscapeClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };
    
    setEventListeners() {
        const closeButton = this._popupElement.querySelector(".popup__close");
        
        closeButton.addEventListener("click", () => {
            this.close();
        });

    this._popupElement.addEventListener("click", (evt) => {
    if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}