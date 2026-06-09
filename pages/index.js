import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { Todo } from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const handleDeleteTodo = (todoData) => {
  todoCounter.updateTotal(false);

  if (todoData.completed) {
    todoCounter.updateCompleted(false);
  }
};

const handleCheckTodo = (isChecked) => {
  todoCounter.updateCompleted(isChecked);
};

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleDeleteTodo,
    handleCheckTodo
  );

  return todo.getView();
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todoSection.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

const handleAddTodoSubmit = (inputValues) => {
  const date = new Date(inputValues.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = {
    name: inputValues.name,
    date,
    id: uuidv4(),
    completed: false,
  };

  const todoElement = generateTodo(values);
  todoSection.addItem(todoElement);

  todoCounter.updateTotal(true);

  addTodoFormValidator.resetValidation();
  addTodoPopupInstance.close();
};

const addTodoPopupInstance = new PopupWithForm(
  "#add-todo-popup",
  handleAddTodoSubmit
);

const addTodoForm = addTodoPopupInstance.getForm();

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

addTodoPopupInstance.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

todoSection.renderItems();