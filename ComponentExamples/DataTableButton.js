import { DataTableComponent } from "./DataTable.js";

/**
 * Datatable with a button next to the input
 *
 * @param {*} header List of string
 * @param {*} content List of list of string
 * @param {*} buttonTitle Text of the button
 * @param {*} callbackButton Function called when button is clicked on
 * @param {*} onClickCallback Callback when an element of the table is clicked on
 */
export class DataTableButtonComponent extends DataTableComponent {
	constructor(
		header,
		content,
		buttonTitle,
		callbackButton,
		onClickCallback = null,
		isSortable = false,
	) {
		super(header, content, onClickCallback, isSortable);

		this.buttonTitle = buttonTitle;
		this.callback = callbackButton;
	}

	render() {
		return /*html*/ `
		<span class="flex-row full-width marginB-3 marginT-1">
			<input type="text" id="filter" placeholder="Filter the table" class="half-width">
			<button>${this.buttonTitle}</button>
		</span>
		<table id="myTable" class="marginB-3 marginT-1">
			<tr>
			${this.htmlHeader}
			</tr>

			${this.htmlContent}
		</table>
		`;
	}

	renderCSS() {
		let res = super.renderCSS();

		res += /*css*/ `\n
		button {
			padding-left: 2em;
			padding-right: 2em;
			padding-top: .5em;
			padding-bottom: .5em;
		}

		span {
			justify-content: space-evenly !important;
		}

		#filter {
			margin-top: 0 !important;
			margin-bottom: 0 !important;
		}
		`;
		return res;
	}

	runEvents() {
		super.runEvents();

		this.onClick();
	}

	/* =============== Events =============== */

	/**
	 * When button next to the filter input is clicked
	 */
	onClick() {
		this.__html__
			.querySelector("button")
			?.addEventListener("click", this.callback);
	}
}
