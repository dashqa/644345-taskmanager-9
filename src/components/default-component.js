import {createElement} from '../utils';

class DefaultComponent {
  constructor() {
    this._element = null;
    if (new.target === DefaultComponent) {
      throw new Error(`Can't instantiate DefaultComponent, only concrete one.`);
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}

export default DefaultComponent;
