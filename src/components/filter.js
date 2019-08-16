import moment from 'moment';

const fillFilters = (tasks) => ([
  {
    title: `All`,
    count: tasks.length,
  }, {
    title: `Overdue`,
    count: tasks.filter((task) => task.dueDate.isBefore(moment(), `day`)).length,
  }, {
    title: `Today`,
    count: tasks.filter((task) => task.dueDate.isSame(moment(), `day`)).length,
  }, {
    title: `Favorites`,
    count: tasks.filter((task) => task.isFavorite).length,
  }, {
    title: `Repeating`,
    count: tasks.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day]).length),
  }, {
    title: `Tags`,
    count: tasks.filter((task) => task.tags.size).length,
  }, {
    title: `Archive`,
    count: tasks.filter((task) => task.isArchive).length,
  },
]);

export const getFilterComponent = (tasks) => {
  return `
    <section class="main__filter filter container">
     ${fillFilters(tasks).map(({title, count = 0, isChecked = false}) =>
    `<input
          type="radio"
          id="filter__${title}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? `checked` : ``}
          ${count === 0 ? `disabled` : ``}
        />
        <label for="filter__${title}" class="filter__label">
          ${title}
          <span class="filter__all-count">${count}</span>
        </label>`).join(``)}
      </section>
    `;
};
