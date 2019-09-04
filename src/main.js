import {generateData} from "./data/mock";
import NavMenu from './components/nav-menu';
import Search from './components/search';
import Filter from './components/filter';
import BoardController from './controllers/board';
import Statistics from './components/statistics';
import SearchController from './controllers/search';
import {CARDS_QUANTITY, PageElement, Position} from './config';
import {render} from './utils';

const randomTasks = [...Array(CARDS_QUANTITY)].map(generateData);
const taskMocks = JSON.parse(JSON.stringify(randomTasks));

const nav = new NavMenu();
const search = new Search();
const filter = new Filter(taskMocks);
const statistics = new Statistics();

render(PageElement.CONTROL, nav.getElement(), Position.BEFOREEND);
render(PageElement.MAIN, search.getElement(), Position.BEFOREEND);
render(PageElement.MAIN, filter.getElement(), Position.BEFOREEND);
const boardController = new BoardController(PageElement.MAIN);
boardController.show(taskMocks);
render(PageElement.MAIN, statistics.getElement(), Position.BEFOREEND);

const onSearchBackButtonClick = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  boardController.show(taskMocks);
};

const onAddTaskButtonClick = (evt) => {
  boardController.createTask();
  // Вернем выделенный элемент
  PageElement.MAIN.querySelector(`#${evt.target.id}`).checked = true;
};

const onStatisticButtonClick = () => {
  boardController.hide();
  statistics.getElement().classList.remove(`visually-hidden`);
};

const onTasksButtonClick = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  boardController.show();
};

nav.getElement().querySelector(`#control__new-task`).addEventListener(`click`, onAddTaskButtonClick);
nav.getElement().querySelector(`#control__task`).addEventListener(`click`, onTasksButtonClick);
nav.getElement().querySelector(`#control__statistic`).addEventListener(`click`, onStatisticButtonClick);

const searchController = new SearchController(PageElement.MAIN, search, onSearchBackButtonClick);
search.getElement().addEventListener(`click`, () => {
  statistics.getElement().classList.add(`visually-hidden`);
  boardController.hide();
  searchController.show(taskMocks);
});






