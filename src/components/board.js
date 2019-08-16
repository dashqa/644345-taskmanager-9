import {getBoardFilterComponent} from './board-filter';
import {getLoadMoreComponent} from "./load-more";

export const getBoardComponent = () => {
  return `
		<section class="board container">
	     ${getBoardFilterComponent()}
	    <div class="board__tasks">
      </div>
       ${getLoadMoreComponent()}
	  </section>
	`;
};
