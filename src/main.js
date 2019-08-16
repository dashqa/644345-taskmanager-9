import { getNavMenuComponent } from "./components/nav-menu";
import { getSearchComponent } from "./components/search";
import { getBoardComponent } from "./components/board";
import { getCardComponent } from "./components/card";
import { getMock } from './data/mock';
import { getFilterComponent } from "./components/filter";

const CARDS_QUANTITY = 15;
const CARDS_PER_PAGE = 8;
const mainContainer = document.querySelector(`.main`);
const controlContainer = mainContainer.querySelector(`.control`);

const state = {
  tasks: getMock(CARDS_QUANTITY),
  quantityCounter: 0,

  set updatedQuantityCounter(quantity) {
    this.quantityCounter += quantity;
  },
  get leftToShow() {
    return this.tasks.length - this.quantityCounter;
  }
};

let tasksForRender = state.tasks;

const renderComponent = (container, Component) => {
  container.insertAdjacentHTML(`beforeend`, Component);
};

const renderTasks = (start, end) => {
  const boardTasksElement = document.querySelector(`.board__tasks`);
    tasksForRender = state.tasks.slice(start, end);
    state.updatedQuantityCounter = tasksForRender.length;
  renderComponent(boardTasksElement, getCardComponent(tasksForRender));

  if (state.quantityCounter >= CARDS_QUANTITY || CARDS_QUANTITY < CARDS_PER_PAGE) {
    buttonElement.remove();
  }
};

const onClickMoreButton = () => {
  const start = state.quantityCounter;
  let end = state.quantityCounter + state.leftToShow;
  renderTasks(start, end);
};

renderComponent(controlContainer, getNavMenuComponent());
renderComponent(mainContainer, getSearchComponent());
renderComponent(mainContainer, getFilterComponent(state.tasks));
renderComponent(mainContainer, getBoardComponent());
renderTasks(0, CARDS_PER_PAGE);

const buttonElement = document.querySelector(`.load-more`);
buttonElement.addEventListener(`click`, onClickMoreButton);

export default state;

