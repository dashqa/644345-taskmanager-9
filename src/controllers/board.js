import Board from '../components/board';
import Sorting from '../components/sorting';
import CardList from '../components/card-list';
import LoadMore from '../components/load-more';
import TaskController from '../controllers/task';
import {render} from '../utils';
import {CARDS_PER_PAGE, Position} from '../config';

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board(this._tasks.length);
    this._loadMore = new LoadMore();
    this._sorting = new Sorting();
    this._taskList = new CardList();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sorting.getElement(), Position.AFTERBEGIN);
    this._renderBoard();
    this._renderTasks(this._tasks);

    this._sorting.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderBoard() {
    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    if (this._tasks.length > CARDS_PER_PAGE) {
      this._renderLoadMore(CARDS_PER_PAGE);
    }
  }

  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._onChangeView, this._onDataChange);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _renderTasks(tasksArray, start = 0, end = CARDS_PER_PAGE) {
    tasksArray.slice(start, end).map((task) => this._renderTask(task));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.indexOf(oldData)] = newData;
    this._renderBoard();
    this._renderTasks(this._tasks);
  }

  _renderLoadMore() {
    let quantityCounter = CARDS_PER_PAGE;
    render(this._board.getElement(), this._loadMore.getElement(), Position.BEFOREEND);

    const onClickMoreButton = () => {
      const start = quantityCounter;
      const end = quantityCounter + CARDS_PER_PAGE;
      quantityCounter = end;

      if (quantityCounter >= this._tasks.length) {
        this._loadMore.removeElement();
      }
      this._renderTasks(this._tasks, start, end);
    };
    this._loadMore.getElement().addEventListener(`click`, onClickMoreButton);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.className !== `board__filter`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
}

export default BoardController;
