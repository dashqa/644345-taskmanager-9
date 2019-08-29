import moment from 'moment';
import DefaultComponent from './default-component';
import {CARD_COLORS} from './../config';

class CardEdit extends DefaultComponent {
  constructor({description, dueDate, tags, color, repeatingDays, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._isRepeating = Object.values(this._repeatingDays).some((day) => day === true);

    this._subscribeOnEvents();
  }

  getTemplate() {
    return `
      <article class="card card--edit card--${this._color} 
        ${this._isRepeating ? `card--repeat` : `` }">
          <form class="card__form" method="get">
            <div class="card__inner">
              <div class="card__control">
                <button 
                type="button" 
                class="card__btn card__btn--archive ${!this._isArchive ? `card__btn--disabled` : ``}">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${!this._isFavorite ? `card__btn--disabled` : ``}"
              >
                favorites
              </button>
              </div>
      
              <div class="card__color-bar">
                <svg class="card__color-bar-wave" width="100%" height="10">
                  <use xlink:href="#wave"></use>
                </svg>
              </div>
      
              <div class="card__textarea-wrap">
                <label>
                  <textarea
                    class="card__text"
                    placeholder="Start typing your text here..."
                    name="text"
                  >${this._description}</textarea>
                </label>
              </div>
      
              <div class="card__settings">
                <div class="card__details">
                  <div class="card__dates">
                    <button class="card__date-deadline-toggle" type="button">
                      date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                    </button>
      
                    <fieldset class="card__date-deadline ${!this._dueDate ? `disabled` : ``}">
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder=""
                          name="date"
                          value="${moment(this._dueDate).format(`ddd MMM DD YYYY HH:mm`)}"
                        />
                      </label>
                    </fieldset>
      
                    <button class="card__repeat-toggle" type="button">
                      repeat:<span class="card__repeat-status">${this._isRepeating ? `yes` : `no`}</span>
                    </button>
      
                    <fieldset class="card__repeat-days" ${!this._isRepeating ? `disabled` : ``}>
                      <div class="card__repeat-days-inner">
                      ${Object.keys(this._repeatingDays).map((day) => (`<input
                          class="visually-hidden card__repeat-day-input"
                          type="checkbox"
                          id="repeat-${day}-4"
                          name="repeat"
                          value="${day}"
                          ${this._repeatingDays[day] ? `checked` : ``}
                        />
                      <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`.trim())).join(``)}
                      </div>
                    </fieldset>
                  </div>
                  <div class="card__hashtag">
                    <div class="card__hashtag-list">
                      ${(Array.from(this._tags).map((tag) => (`
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="${tag}"
                            class="card__hashtag-hidden-input" 
                          />
                          <p class="card__hashtag-name">
                           #${tag}
                          </p>
                        <button type="button" class="card__hashtag-delete">
                          delete
                        </button>
                      </span>`.trim()))).join(``)}
                    </div>
                    <label>
                      <input
                        type="text"
                        class="card__hashtag-input"
                        name="hashtag-input"
                        placeholder="Type new hashtag here"
                      />
                    </label>
                  </div>
                </div>
      
                <div class="card__colors-inner">
                  <h3 class="card__colors-title">Color</h3>
                  <div class="card__colors-wrap">
                  ${CARD_COLORS.map((color) => `
                      <input
                        type="radio"
                        id="color-${color}-4"
                        class="card__color-input card__color-input--${color} visually-hidden"
                        name="color"
                        value="${color}"
                        ${color === this._color ? `checked` : ``}
                      />
                      <label
                        for="color-${color}-4"
                        class="card__color card__color--${color}">${color}</label>`.trim()).join(``)}  
                  </div>
                </div>
              </div>
      
              <div class="card__status-btns">
                <button class="card__save" type="submit">save</button>
                <button class="card__delete" type="button">delete</button>
              </div>
            </div>
          </form>
        </article>`.trim();
  }

  _onColorChange(evt) {
    const classNames = CARD_COLORS.map((color) => `card--${color}`);
    const containsClass = classNames.find((className) => this._element.classList.contains(className));

    if (containsClass) {
      this._element.classList.remove(`${containsClass}`);
    }
    this._element.classList.add(`card--${evt.target.value}`);
  }

  _onHashtagEnterKey(evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      evt.stopPropagation();
      this._element.querySelector(`.card__hashtag-list`)
        .insertAdjacentHTML(`beforeend`, `<span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${evt.target.value}"
              class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${evt.target.value}
            </p>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`);

      this._element.querySelectorAll(`.card__hashtag-delete`).forEach((button) => {
        button.addEventListener(`click`, this._onHashtagDelete.bind(this));
      });
      evt.target.value = ``;
    }
  }

  _onHashtagDelete(evt) {
    evt.target.parentElement.remove();
  }

  _onDateStatusClick(evt) {
    evt.preventDefault();
    const dateInput = this._element.querySelector(`.card__date`);
    const dateStatus = this._element.querySelector(`.card__date-status`);
    const deadline = this._element.querySelector(`.card__date-deadline`);

    if (deadline.hasAttribute(`disabled`)) {
      deadline.removeAttribute(`disabled`);
      dateStatus.innerHTML = `yes`;
      dateInput.value = moment.utc(this._dueDate);
    } else {
      deadline.setAttribute(`disabled`, `true`);
      dateStatus.innerHTML = `no`;
      dateInput.value = ``;
    }
  }

  _onRepeatStatusClick(evt) {
    evt.preventDefault();
    const repeatStatus = this._element.querySelector(`.card__repeat-status`);
    const repeatDays = this._element.querySelector(`.card__repeat-days`);
    const inputs = this._element.querySelectorAll(`.card__repeat-day-input`);

    if (repeatDays.hasAttribute(`disabled`)) {
      repeatDays.removeAttribute(`disabled`);
      this._element.classList.add(`card--repeat`);
      repeatStatus.innerHTML = `yes`;
    } else {
      repeatDays.setAttribute(`disabled`, `true`);
      this._element.classList.remove(`card--repeat`);
      repeatStatus.innerHTML = `no`;
      [...inputs].forEach((input) => (input.value = ``));
    }
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onRepeatStatusClick.bind(this));
    this.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onDateStatusClick.bind(this));
    this.getElement().querySelector(`.card__hashtag-input`).addEventListener(`keydown`, this._onHashtagEnterKey.bind(this));
    this.getElement().querySelectorAll(`.card__color-input`).forEach((input) => {
      input.addEventListener(`change`, this._onColorChange.bind(this));
    });
    this.getElement().querySelectorAll(`.card__hashtag-delete`).forEach((button) => {
      button.addEventListener(`click`, this._onHashtagDelete.bind(this));
    });

  }
}

export default CardEdit;
