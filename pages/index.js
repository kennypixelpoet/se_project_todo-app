import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { Todo } from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";


const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup);
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscape);
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todosList.append(todoElement);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = {
    name,
    date,
    id: uuidv4(),
    completed: false,
  };

  renderTodo(values);

  addTodoFormValidator.resetValidation();
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  renderTodo(item);
});
