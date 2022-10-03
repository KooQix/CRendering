import { Component } from "../Component.js";

/**
 * Input with autocompletion
 */
export class AutocompleteInputComponent extends Component {
	/**
	 * Creates an input with autocompletion
	 *
	 * @param {*} data array of { value: "value", displayName: "displayName" }
	 * @param {*} required Whether the field is required or not
	 * @param {*} placeholder The placeholder
	 */
	constructor(
		data,
		msgValidation = null,
		required = false,
		placeholder = null,
		callback = null,
	) {
		super();

		this.data = data;
		this.msgValidation = msgValidation;
		this.required = required;
		this.placeholder = placeholder;

		this.callback = callback;

		this.value = null;
	}

	render() {
		return /*html*/ `
		<div id="container">
			<span id="c">
				<input type="text" id="myInput" name="myInput" placeholder="${
					this.placeholder ? this.placeholder : ""
				}" ${this.required ? "required" : ""}>
			</span>
		</div>
	`;
	}

	renderCSS() {
		return /*css*/ `

	#container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		// align-items: center;
	}


	#myInput {
		width: 100% !important;
		height: 2em;
	}

	#c {
		width: 100%;
		display: flex;
		align-items: end;
		flex-direction: column;
	}

	
	.autocomplete {
		/*the container must be positioned relative:*/
		position: relative;
		display: inline-block;
	}
	
	.autocomplete-items {
		position: relative;
		border: 1px solid #d4d4d4;
		border-bottom: none;
		border-top: none;
		z-index: 99;
		/*position the autocomplete items to be the same width as the container:*/
		left: 0;
		right: 0;
		width: 100%;
	}
	
	.autocomplete-items div {
		padding: 10px;
		cursor: pointer;
		background-color: #fff;
		border-bottom: 1px solid #d4d4d4;
	}
	
	.autocomplete-items div:hover {
		/*when hovering an item:*/
		background-color: #e9e9e9;
	}
	
	.autocomplete-active {
		/*when navigating through the items using the arrow keys:*/
		background-color: DodgerBlue !important;
		color: #ffffff;
	}
	`;
	}

	runEvents() {
		this.autocomplete(this.data);

		if (!!this.msgValidation) this.validation();
	}

	/* =============== Other functions =============== */

	getOptions() {
		let res = [];

		for (const elem of this.data) {
			res.push(elem.displayName);
		}

		return res;
	}

	/**
	 * Returns the selected element
	 * When an element is selected (click), the value is saved
	 *
	 * @returns element:  { value: "value", displayName: "displayName" } || null
	 */
	getSelectedElement() {
		if (!!!this.value) {
			const input = this.__html__.querySelector("#myInput");
			if (!input) return null;

			this.value = this.data.find(
				(elem) => elem.displayName == input.value,
			);
			if (!!this.value) return this.value;
		}
		return !!this.value
			? this.data.find((elem) => elem.value == this.value)
			: null;
	}

	/**
	 * Whether the field is valid or not (can be empty)
	 *
	 * @returns
	 */
	validation() {
		const input = this.__html__.querySelector("#myInput");
		if (!input) return;

		const self = this;
		input.addEventListener("focusout", () => {
			// Already invalid, stop
			if (!input.reportValidity()) return;

			if (!self.getSelectedElement() && !!input.value)
				input.setCustomValidity(this.msgValidation);
			else input.setCustomValidity("");
		});
	}

	/**
	 * Autocompletion while typing
	 *
	 * @param {*} data The data to complete with
	 */
	autocomplete(data) {
		const inp = this.__html__.querySelector("#myInput");
		const arr = this.getOptions();

		let self = this;

		/*the autocomplete function takes two arguments,
		the text field element and an array of possible autocompleted values:*/
		var currentFocus;
		/*execute a function when someone writes in the text field:*/
		inp.addEventListener("input", function (e) {
			var a,
				b,
				i,
				val = this.value;

			/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) {
				return false;
			}
			currentFocus = -1;
			/*create a DIV element that will contain the items (values):*/
			a = document.createElement("DIV");
			a.setAttribute("id", this.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-items");

			/*append the DIV element as a child of the autocomplete container:*/
			this.parentNode.appendChild(a);
			/*for each item in the array...*/
			for (i = 0; i < arr.length; i++) {
				/*check if the item starts with the same letters as the text field value:*/
				if (arr[i].toUpperCase().includes(val.toUpperCase())) {
					/*create a DIV element for each matching element:*/
					b = document.createElement("DIV");
					/*make the matching letters bold:*/
					b.innerHTML =
						"<strong>" + arr[i].substr(0, val.length) + "</strong>";
					b.innerHTML += arr[i].substr(val.length);
					/*insert a input field that will hold the current array item's value:*/
					b.innerHTML += `<input type='hidden' value="${arr[i]}">`;
					/*execute a function when someone clicks on the item value (DIV element):*/
					b.addEventListener("click", function (e) {
						/*insert the value for the autocomplete text field:*/
						inp.value = this.getElementsByTagName("input")[0].value;

						// Get the selected value (not displayName)
						const selectedElement = data.find(
							(elem) =>
								elem.displayName
									.toLowerCase()
									.replace(/(\r\n|\n|\r)/gm, "") ==
								inp.value
									.toLowerCase()
									.replace(/(\r\n|\n|\r)/gm, ""),
						);

						self.value = !!selectedElement
							? selectedElement.value
							: "";

						// Create validation with custom message
						if (!!self.value) inp.setCustomValidity("");

						// Then, execute callback
						try {
							self.callback(data.indexOf(selectedElement));
						} catch (error) {}

						/*close the list of autocompleted values,
						(or any other open lists of autocompleted values:*/
						closeAllLists();
					});
					a.appendChild(b);
				}
			}
		});
		/*execute a function presses a key on the keyboard:*/
		inp.addEventListener("keydown", function (e) {
			var x = self.__html__.querySelector(
				"#" + this.id + "autocomplete-list",
			);
			if (x) x = x.getElementsByTagName("div");
			if (e.keyCode == 40) {
				/*If the arrow DOWN key is pressed,
				increase the currentFocus variable:*/
				currentFocus++;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 38) {
				//up
				/*If the arrow UP key is pressed,
				decrease the currentFocus variable:*/
				currentFocus--;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 13) {
				/*If the ENTER key is pressed, prevent the form from being submitted,*/
				e.preventDefault();
				if (currentFocus > -1) {
					/*and simulate a click on the "active" item:*/
					if (x) x[currentFocus].click();
				}
			}
		});

		function addActive(x) {
			/*a function to classify an item as "active":*/
			if (!x) return false;
			/*start by removing the "active" class on all items:*/
			removeActive(x);
			if (currentFocus >= x.length) currentFocus = 0;
			if (currentFocus < 0) currentFocus = x.length - 1;
			/*add class "autocomplete-active":*/
			x[currentFocus].classList.add("autocomplete-active");
		}

		function removeActive(x) {
			for (const elem of x) elem.classList.remove("autocomplete-active");
		}

		function closeAllLists(element) {
			/*close all autocomplete lists in the document,
			except the one passed as an argument:*/
			var x = document.getElementsByClassName("autocomplete-items");

			for (const elem of x) {
				if (element != elem && element != inp)
					elem.parentNode.removeChild(elem);
			}
		}
		/*execute a function when someone clicks in the document:*/
		document.addEventListener("click", function (e) {
			closeAllLists(e.target);
		});
	}
}
