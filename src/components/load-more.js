import DefaultComponent from './default-component';

class LoadMore extends DefaultComponent {
  getTemplate() {
    return `
      <button class="load-more" type="button">load more</button>
  `.trim();
  }
}

export default LoadMore;
