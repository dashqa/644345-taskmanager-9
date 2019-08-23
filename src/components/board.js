import {getBoardFilterComponent} from './board-filter';
import {getNoTasksBoardTemplate} from './board-no-tasks';
import {getLoadMoreComponent} from "./load-more";

export const getBoardComponent = (tasksQuantity) => {
  return `
		<section class="board container">
		${!tasksQuantity ? getNoTasksBoardTemplate() : `
      ${getBoardFilterComponent()}
        <div class="board__tasks"></div>
         ${getLoadMoreComponent()}`}
	  </section>
	`;
};
