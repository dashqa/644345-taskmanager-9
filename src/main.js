import { getNavMenuComponent } from "./components/nav-menu";
import { getSearchComponent } from "./components/search";
import { getBoardComponent } from "./components/board";
import { getFilterComponent } from "./components/filter";
import {Position, render, createElement} from './utils';
import {generateData} from "./data/mock";
import Card from './components/card';
import CardEdit from './components/card-edit';


const CARDS_QUANTITY = 10;
const CARDS_PER_PAGE = 8;
const mainContainer = document.querySelector(`.main`);
const controlContainer = mainContainer.querySelector(`.control`);

const taskMocks = [...Array(CARDS_QUANTITY)].map(generateData);
const updateQuantityCounter = (quantity) => quantityCounter += quantity;
let quantityCounter = 0;
let tasksForRender = [];

const renderTask = (taskMock) => {
  const cardsContainer = document.querySelector(`.board__tasks`);
  const task = new Card(taskMock);
  const taskEdit = new CardEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      onSaveButtonClick();
    }
  };

  const onSaveButtonClick = () => {
    cardsContainer.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEditButtonClick = () => {
    cardsContainer.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  task.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, onEditButtonClick);
  taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, onSaveButtonClick);
  taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, onSaveButtonClick);

  render(cardsContainer, task.getElement(), Position.BEFOREEND);
};

const renderTasks = (start = 0, end = CARDS_PER_PAGE) => {
  tasksForRender = taskMocks.slice(start, end);
  updateQuantityCounter(tasksForRender.length);
  tasksForRender.map((task) => renderTask(task));

  if (quantityCounter >= CARDS_QUANTITY || CARDS_QUANTITY < CARDS_PER_PAGE) {
    buttonElement.remove();
  }
};

render(controlContainer, createElement(getNavMenuComponent()), Position.BEFOREEND);
render(mainContainer, createElement(getSearchComponent()), Position.BEFOREEND);
render(mainContainer, createElement(getFilterComponent(taskMocks)), Position.BEFOREEND);
render(mainContainer, createElement(getBoardComponent(taskMocks.length)), Position.BEFOREEND);
renderTasks();

const onClickMoreButton = () => {
  const start = quantityCounter;
  const end = quantityCounter + CARDS_PER_PAGE;
  renderTasks(start, end);
};

const buttonElement = document.querySelector(`.load-more`);
buttonElement.addEventListener(`click`, onClickMoreButton);


