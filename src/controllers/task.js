import Card from './../components/card';
import CardEdit from './../components/card-edit';
import {render} from '../utils';
import {Position, TaskControllerMode} from '../config';
import moment from 'moment';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

class TaskController {
  constructor(container, data, mode, onChangeView, onDataChange) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskView = new Card(data);
    this._taskEdit = new CardEdit(data);

    this.create(mode);
  }

  create(mode) {
    const currentTask = this._taskView.getElement();
    const currentTaskEdit = this._taskEdit.getElement();
    const textareaElement = currentTaskEdit.querySelector(`.card__text`);

    const renderPosition = mode === TaskControllerMode.ADDING ? Position.AFTERBEGIN : Position.BEFOREEND;
    const currentView = mode === TaskControllerMode.ADDING ? this._taskEdit : this._taskView;

    flatpickr(this._taskEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `F j, Y h:i K`,
      defaultDate: this._data.dueDate,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (mode === TaskControllerMode.DEFAULT) {
          this.setDefaultView();
        } else if (mode === TaskControllerMode.ADDING) {
          this._container.removeChild(currentView.getElement());
        }
      }
    };

    const onSaveButtonClick = () => {
      const formData = new FormData(currentTaskEdit.querySelector(`.card__form`));

      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: moment.utc(formData.get(`date`)).format(),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, day) => {
          acc[day] = true;
          return acc;
        }, {
          'Mo': false,
          'Tu': false,
          'We': false,
          'Th': false,
          'Fr': false,
          'Sa': false,
          'Su': false,
        })
      };

      this._onDataChange(entry, mode === TaskControllerMode.DEFAULT ? this._data : null);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onDeleteButtonClick = () => {
      this._onDataChange(null, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEditButtonClick = () => {
      this._onChangeView();
      this._container.replaceChild(currentTaskEdit, currentTask);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onFavoriteButtonClick = (evt) => {
      evt.preventDefault();
      const entry = {
        ...this._data,
        isFavorite: !this._data.isFavorite,
      };

      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onArchiveButtonClick = (evt) => {
      evt.preventDefault();
      const entry = {
        ...this._data,
        isArchive: !this._data.isArchive,
      };

      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    textareaElement.addEventListener(`blur`, () => document.addEventListener(`keydown`, onEscKeyDown));
    textareaElement.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onEscKeyDown));

    currentTask.querySelector(`.card__btn--edit`).addEventListener(`click`, onEditButtonClick);
    currentTaskEdit.querySelector(`.card__save`).addEventListener(`click`, onSaveButtonClick);
    currentTaskEdit.querySelector(`.card__delete`).addEventListener(`click`, onDeleteButtonClick.bind(this._data));

    currentTask.querySelector(`.card__btn--favorites`).addEventListener(`click`, onFavoriteButtonClick.bind(this._data));
    currentTaskEdit.querySelector(`.card__btn--favorites`).addEventListener(`click`, onFavoriteButtonClick.bind(this._data));

    currentTask.querySelector(`.card__btn--archive`).addEventListener(`click`, onArchiveButtonClick.bind(this._data));
    currentTaskEdit.querySelector(`.card__btn--archive`).addEventListener(`click`, onArchiveButtonClick.bind(this._data));

    render(this._container, currentView.getElement(), renderPosition);
  }

  setDefaultView() {
    if (this._container.contains(this._taskEdit.getElement())) {
      this._container.replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}

export default TaskController;
