import Board from '../components/board';
import Sorting from '../components/sorting';
import CardList from '../components/card-list';
import LoadMore from '../components/load-more';
import TaskListController from '../controllers/tasklist';
import {render} from '../utils';
import {CARDS_PER_PAGE, Position} from '../config';

class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._board = new Board();
    this._loadMore = new LoadMore();
    this._sorting = new Sorting();
    this._taskList = new CardList();

    this._initialTasks = [];
    this._showedTasks = CARDS_PER_PAGE;

    this._onClickMoreButton = this._onClickMoreButton.bind(this);
    this._taskListController = new TaskListController(this._taskList.getElement(), this._onDataChange.bind(this));

    this._init();
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    if (tasks !== this._tasks) {
      this._setTasks(tasks);
    }
    this._board.getElement().classList.remove(`visually-hidden`);
  }

  createTask() {
    this._taskListController.createTask();
  }

  _init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sorting.getElement(), Position.AFTERBEGIN);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    this._sorting.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _setTasks(tasks) {
    this._tasks = tasks;
    this._initialTasks = [...tasks];

    this._showedTasks = CARDS_PER_PAGE;
    this._renderBoard();
  }

  _onDataChange(tasks) {
    this._tasks = tasks;
    this._initialTasks = [...tasks];

    this._renderBoard();
  }

  _renderBoard() {
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    if (!this._tasks.length) {
      return this._taskList.getElement().insertAdjacentHTML(`beforeend`, `
          <p class="board__no-tasks">Congratulations, all tasks were completed! To create a new click on«add new task» button.</p>`);
    }

    this._loadMore.removeElement();
    if (this._showedTasks < this._tasks.length) {
      this._renderLoadMore();
      this._taskListController.setTasks(this._tasks.slice(0, this._showedTasks));
    }

    return null;
  }

  _renderLoadMore() {
    render(this._board.getElement(), this._loadMore.getElement(), Position.BEFOREEND);
    this._loadMore.getElement().addEventListener(`click`, this._onClickMoreButton);
  }

  _onClickMoreButton() {
    this._taskListController.addTasks(this._tasks.slice(this._showedTasks, this._showedTasks + CARDS_PER_PAGE));
    this._showedTasks += CARDS_PER_PAGE;

    if (this._showedTasks >= this._tasks.length) {
      this._loadMore.removeElement();
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.className !== `board__filter`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    const getSortedFilmsArray = () => {
      switch (evt.target.dataset.sortType) {
        case `date-up`:
          return this._tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        case `date-down`:
          return this._tasks.slice().sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        case `default`:
          return this._initialTasks;
      }
      return null;
    };

    this._tasks = getSortedFilmsArray();
    this._taskListController.setTasks(this._tasks.slice(0, this._showedTasks));
  }
}

export default BoardController;
