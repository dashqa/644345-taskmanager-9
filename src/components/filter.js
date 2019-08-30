import moment from 'moment';
import DefaultComponent from './default-component';

class Filter extends DefaultComponent {
  constructor(tasks) {
    super();
    this._tasks = tasks;
  }

  _fillFilters() {
    return [
      {
        title: `All`,
        count: this._tasks.length,
      }, {
        title: `Overdue`,
        count: this._tasks.filter((task) => moment(task.dueDate).isBefore(moment(), `day`)).length,
      }, {
        title: `Today`,
        count: this._tasks.filter((task) => moment(task.dueDate).isSame(moment(), `day`)).length,
      }, {
        title: `Favorites`,
        count: this._tasks.filter((task) => task.isFavorite).length,
      }, {
        title: `Repeating`,
        count: this._tasks.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]).length),
      }, {
        title: `Tags`,
        count: this._tasks.filter((task) => task.tags.size).length,
      }, {
        title: `Archive`,
        count: this._tasks.filter((task) => task.isArchive).length,
      }];
  }

  getTemplate() {
    return `
    <section class="main__filter filter container">
     ${this._fillFilters().map(({title, count = 0, isChecked = false}) =>
    `<input
        type="radio"
        id="filter__${title}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}
        ${!count ? `disabled` : ``}
      />
      <label for="filter__${title}" class="filter__label">
        ${title}
        <span class="filter__all-count">${count}</span>
      </label>`).join(``)}
    </section>
  `.trim();
  }
}

export default Filter;


