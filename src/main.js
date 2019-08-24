import {generateData} from "./data/mock";
import NavMenu from './components/nav-menu';
import Search from './components/search';
import Filter from './components/filter';
import BoardController from './components/controllers/board';
import {CARDS_QUANTITY, PageElement, Position} from './config';
import {render} from './utils';

const taskMocks = [...Array(CARDS_QUANTITY)].map(generateData);

const nav = new NavMenu;
const search = new Search;
const filter = new Filter(taskMocks);
const boardController = new BoardController(PageElement.MAIN, taskMocks);

render(PageElement.CONTROL, nav.getElement(), Position.BEFOREEND);
render(PageElement.MAIN, search.getElement(), Position.BEFOREEND);
render(PageElement.MAIN, filter.getElement(), Position.BEFOREEND);
boardController.init();





