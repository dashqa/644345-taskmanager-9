import { getNavMenuMarkup } from "./components/nav-menu";
import { getSearchMarkup } from "./components/search";
import { getFilterMarkup } from "./components/filter";
import { getBoardMarkup } from "./components/task-board";
import { getCardMarkup } from "./components/task-card";
import { getLoadMoreMarkup } from "./components/load-more";

const CARD_QUANTITY = 3;
const mainContainer = document.querySelector(`.main`);
const controlContainer = mainContainer.querySelector(`.control`);

const renderComponent = (container, markup, quantity = 1) => {
  for (let i = 0; i < quantity; i++) {
    container.insertAdjacentHTML(`beforeend`, markup);
  }
};

const renderTasksBoard = () => {
  const boardContainer = document.querySelector(`.board`);
  const boardTasksContainer = boardContainer.querySelector(`.board__tasks`);
  renderComponent(boardTasksContainer, getCardMarkup(true));
  renderComponent(boardTasksContainer, getCardMarkup(), CARD_QUANTITY);
  renderComponent(boardContainer, getLoadMoreMarkup());
};

renderComponent(controlContainer, getNavMenuMarkup());
renderComponent(mainContainer, getSearchMarkup());
renderComponent(mainContainer, getFilterMarkup());
renderComponent(mainContainer, getBoardMarkup());
renderTasksBoard();

