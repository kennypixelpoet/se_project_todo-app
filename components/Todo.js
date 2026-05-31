 export class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._handleDeleteTodo = this._handleDeleteTodo;
    this._handleCheckTodo = this._handleCheckTodo;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteTodo(this._data);
      this._element.remove();
    });

    this._checkboxEl.addEventListener("change", () => {
      this._data.completed = this._checkboxEl.checked;
      this._data.completed = this._checkboxEl.checked;
    });
  }

  getView() {
    this._element = document
      .querySelector(this._selector)
      .content
      .querySelector(".todo")
      .cloneNode(true);

    this._nameEl = this._element.querySelector(".todo__name");
    this._checkboxEl = this._element.querySelector(".todo__completed");
    this._labelEl = this._element.querySelector(".todo__label");
    this._dateEl = this._element.querySelector(".todo__date");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");

    this._nameEl.textContent = this._data.name;
    this._checkboxEl.checked = this._data.completed;

    this._checkboxEl.id = `todo-${this._data.id}`;
    this._labelEl.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);

    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();

    return this._element;
  }
}