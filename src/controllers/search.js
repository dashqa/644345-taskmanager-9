import SearchResult from '../components/search-result';
import SearchResultInfo from '../components/search-result-info';
import SearchResultGroup from '../components/search-result-group';
import {render, Position} from '../utils.js';
import TaskListController from './../controllers/tasklist';

class SearchController {
  constructor(container, search, onBackButtonClick, onDataChange) {
    this._container = container;
    this._search = search;
    this._onBackButtonClick = onBackButtonClick;
    this._onDataChangeMain = onDataChange;

    this._tasks = [];
    this._searchResult = new SearchResult();
    this._searchResultInfo = new SearchResultInfo({});
    this._searchResultGroup = new SearchResultGroup({});
    this._taskListController = new TaskListController(
        this._searchResultGroup.getElement().querySelector(`.result__cards`),
        this._onDataChange.bind(this));

    this._onResultBackButtonClick = this._onResultBackButtonClick.bind(this);
    this._onInputKeyup = this._onInputKeyup.bind(this);

    this._init();
  }


  _init() {
    this.hide();

    render(this._container, this._searchResult.getElement(), Position.BEFOREEND);
    render(this._searchResult.getElement(), this._searchResultGroup.getElement(), Position.BEFOREEND);
    render(this._searchResultGroup.getElement(), this._searchResultInfo.getElement(), Position.AFTERBEGIN);

    this._searchResult.getElement().querySelector(`.result__back`).addEventListener(`click`, this._onResultBackButtonClick);
    this._search.getElement().querySelector(`input`).addEventListener(`keyup`, this._onInputKeyup);
  }

  hide() {
    this._searchResult.getElement().classList.add(`visually-hidden`);
  }

  show(tasks) {
    this._tasks = tasks;

    if (this._searchResult.getElement().classList.contains(`visually-hidden`)) {
      this._showSearchResult(``, this._tasks);
      this._searchResult.getElement().classList.remove(`visually-hidden`);
    }
  }

  _onResultBackButtonClick() {
    this._search.getElement().querySelector(`input`).value = ``;
    this._onBackButtonClick();
  }

  _onInputKeyup(evt) {
    const {value} = evt.target;
    const tasks = this._tasks.filter((task) => task.description.toLowerCase().includes(value.toLowerCase()));
    this._showSearchResult(value, tasks);
  }

  _showSearchResult(text, tasks) {
    if (this._searchResultInfo) {
      this._searchResultInfo.removeElement();
    }

    this._searchResultInfo = new SearchResultInfo({title: text, count: tasks.length});
    render(this._searchResultGroup.getElement(), this._searchResultInfo.getElement(), Position.AFTERBEGIN);
    this._taskListController.setTasks(tasks);
  }

  _onDataChange(tasks) {
    this._tasks = tasks;
    this._onDataChangeMain(this._tasks);
  }
}

export default SearchController;
