import DefaultComponent from './default-component';

class CardList extends DefaultComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}

export default CardList;
