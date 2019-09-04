import DefaultComponent from "./default-component";

class Board extends DefaultComponent {
  getTemplate() {
    return `
    <section class="board container"></section>`.trim();
  }
}

export default Board;
