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

const onSearchBackButtonClick = () => {
  statistics.getElement().classList.add(`visually-hidden`);
  searchController.hide();
  boardController.show(taskMocks);
};
const searchController = new SearchController(PageElement.MAIN, search, onSearchBackButtonClick);

render(PageElement.MAIN, statistics.getElement(), Position.BEFOREEND);

nav.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();
  if (evt.target.tagName !== `INPUT`) {
    return;
  }

  const tasksId = `control__task`;
  const statisticId = `control__statistic`;
  const newTaskId = `control__new-task`;

  switch (evt.target.id) {
    case tasksId:
      statistics.getElement().classList.add(`visually-hidden`);
      boardController.show();
      break;
    case statisticId:
      boardController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
    case newTaskId:
      boardController.createTask();
      // Вернем выделенный элемент
      PageElement.MAIN.querySelector(`#${tasksId}`).checked = true;
      break;
  }
});

search.getElement().addEventListener(`click`, () => {
  statistics.getElement().classList.add(`visually-hidden`);
  boardController.hide();
  searchController.show(taskMocks);
});





