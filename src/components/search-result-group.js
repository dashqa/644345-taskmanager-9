import DefaultComponent from './default-component';

class SearchResultGroup extends DefaultComponent {
  getTemplate() {
    return `<section class="result__group">
      <div class="result__cards"></div>
      <!--Append tasks here-->
    </section>`;
  }
}

export default SearchResultGroup;
