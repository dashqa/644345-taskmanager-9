import Card from './../components/card';
import CardEdit from './../components/card-edit';
import {render} from '../utils';
import {Position} from '../config';
import moment from 'moment';

class TaskController {
  constructor(container, data, onChangeView, onDataChange) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskView = new Card(data);
    this._taskEdit = new CardEdit(data);

    this.create();
  }

  create() {
    const currentTask = this._taskView.getElement();
    const currentTaskEdit = this._taskEdit.getElement();
    const textareaElement = currentTaskEdit.querySelector(`.card__text`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.setDefaultView();
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

      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEditButtonClick = () => {
      this._onChangeView();
      this._container.getElement().replaceChild(currentTaskEdit, currentTask);
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

    currentTask.querySelector(`.card__btn--favorites`).addEventListener(`click`, onFavoriteButtonClick.bind(this._data));
    currentTaskEdit.querySelector(`.card__btn--favorites`).addEventListener(`click`, onFavoriteButtonClick.bind(this._data));

    currentTask.querySelector(`.card__btn--archive`).addEventListener(`click`, onArchiveButtonClick.bind(this._data));
    currentTaskEdit.querySelector(`.card__btn--archive`).addEventListener(`click`, onArchiveButtonClick.bind(this._data));

    render(this._container.getElement(), currentTask, Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}

export default TaskController;
