import DefaultComponent from "./default-component";

class Board extends DefaultComponent {
  constructor(tasksQuantity) {
    super();
    this._tasksQuantity = tasksQuantity;
  }

  getTemplate() {
    return `
    <section class="board container">
     ${!this._tasksQuantity ? `<p class="board__no-tasks">
          Congratulations, all tasks were completed! To create a new click on«add new task» button.
      </p>`.trim() : ``}</section>`.trim();
  }
}

export default Board;
