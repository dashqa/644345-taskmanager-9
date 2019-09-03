import DefaultComponent from './default-component';

class SearchResult extends DefaultComponent {
  getTemplate() {
    return `<section class="result container">
      <button class="result__back">back</button>
    </section>`;
  }
}

export default SearchResult;
