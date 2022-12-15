import { Component } from "../Component.js";

/**
 * Formatted data table
 */
export class DataTableComponent extends Component {
	/**
	 *
	 * @param {*} header List of string (the headers of the datatable)
	 * @param {*} content List of list of string (content of the datatable)
	 * @param {*} callback Callback takes the index of the element clicked on to enable some logic on this element
	 */
	constructor(header, content, onClickCallback = null, isSortable = false) {
		super();

		this.header = header;
		this.htmlHeader = "";
		this.content = content;
		this.htmlContent = "";

		this.onClickCallback = onClickCallback;
		this.isSortable = isSortable;

		this.setHtmlHeader();
		this.setHtmlContent();

		if (this.isSortable) setTimeout(() => this.makeAllSortable(), 50);
	}

	render() {
		return /*html*/ `
		<span class="flex-row full-width marginB-1">
			<input type="text" id="filter" placeholder="Filter table" class="half-width">
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
		return /*css*/ `

		#filter {
			padding: 12px 20px 12px 40px;
			/* Add some padding */
			border: 1px solid #ddd;
			/* Add a grey border */
			border-radius: 4px;
			height: 2.2em;
		}


		#myTable {
			width: 90%;
			font-family: arial, sans-serif;
			border-collapse: collapse;
			width: 100%;
			margin-top: 3em;
		}

		.elem-header {
			font-weight: bold;
			background-color: #D3D3D3;
			cursor: pointer;
			
		}

		.elem-header img {
			height: 1em;
			margin-left: 2em;
		}

		td,
		th {
			border: 1px solid #dddddd;
			text-align: left;
			padding: 8px;
			cursor: default;
		}

		`;
	}

	runEvents() {
		this.myFunctionFilter();
		this.click();
	}

	/* =============== Events =============== */

	/**
	 * Filter the datatable
	 */
	myFunctionFilter() {
		this.__html__
			.querySelector("#filter")
			?.addEventListener("keyup", () => {
				var input, filter, table, tr, i, txtValue, tds;
				input = this.__html__.querySelector("#filter");
				filter = input.value.toUpperCase();
				table = this.__html__.querySelector("#myTable");
				tr = table.querySelectorAll("#content");

				// Loop through all table rows, and hide those who don't match the search query
				for (i = 0; i < tr.length; i++) {
					tds = tr[i].querySelectorAll("td");
					let show = false;
					for (let td of tds) {
						if (td) {
							txtValue = td.textContent || td.innerText;
							if (txtValue.toUpperCase().indexOf(filter) > -1)
								show = true;
						}
					}
					if (!show) tr[i].style.display = "none";
					else tr[i].style.display = "";
				}
			});
	}

	/**
	 * Enable some logic when an element is clicked on
	 */
	click() {
		const elems = this.__html__.querySelectorAll("#content");
		for (let i = 0; i < elems.length; i++) {
			const elem = elems[i];

			elem?.addEventListener("click", () => {
				const indexSelectedElem = i;

				// callback takes the index of the selected argument as parameter to able some logic
				try {
					this.onClickCallback(indexSelectedElem);
				} catch (error) {}
			});

			for (const td of elem.querySelectorAll("td")) {
				td.style.cursor = "pointer";
				td.title = "Click";
			}
		}
	}

	/* =============== Others =============== */

	/**
	 * Build the html (header)
	 */
	setHtmlHeader() {
		this.htmlHeader = "<thead title='Cliquer pour ordonner'>";
		for (const h of this.header) {
			this.htmlHeader += /*html*/ `
			<td class="elem-header">${h}<img src="../resources/sort.png"></td>
			`;
		}
		this.htmlHeader += "</thead>";
	}

	/**
	 * Build the html (content)
	 */
	setHtmlContent() {
		this.htmlContent = "<tbody>";
		for (const content of this.content) {
			this.htmlContent += /*html*/ `
			<tr id="content">
			`;

			for (const elem of content) {
				this.htmlContent += /*html*/ `
				<td class="table-elem">${elem}</td>
				`;
			}

			this.htmlContent += /*html*/ `
			</tr>
			`;
		}

		this.htmlContent += "</tbody>";
	}

	/**
	 * Set the content of the datatable
	 *
	 * @param {*} newContent The new content of the table
	 */
	updateContent(newContent) {
		this.content = newContent;
		this.htmlContent = "";
		this.setHtmlContent();
		this.__refresh__();
		if (this.isSortable) setTimeout(() => this.makeAllSortable(), 20);
	}

	/* =============== Sorting =============== */

	sortTable(table, col, reverse) {
		var tb = table.tBodies[1], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
			tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
			i;

		reverse = -(+reverse || -1);
		tr = tr.sort(function (a, b) {
			// sort rows
			return (
				reverse * // `-1 *` if want opposite order
				a.cells[col].textContent
					.trim() // using `.textContent.trim()` for test
					.localeCompare(b.cells[col].textContent.trim())
			);
		});
		for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
	}

	makeSortable(table) {
		var th = table.tHead,
			i;

		th && (th = th.rows[0]) && (th = th.cells);
		if (th) i = th.length;
		else return; // if no `<thead>` then do nothing

		const self = this;
		while (--i >= 0)
			(function (i) {
				var dir = 1;
				th[i].addEventListener("click", function () {
					self.sortTable(table, i, (dir = 1 - dir));
				});
			})(i);

		// sortTable(table, i, (dir = 1 - dir))
	}

	makeAllSortable() {
		parent = this.__html__;
		var t = parent.querySelector("#myTable");
		this.makeSortable(t);
	}
}
