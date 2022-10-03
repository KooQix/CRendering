import { AutocompleteInputComponent } from "./AutocompleteInput.js";


/**
 * Input with autocompletion and label
 */
export class AutocompleteLabelInputComponent extends AutocompleteInputComponent {

	/**
	 * Creates an input with autocompletion
	 * 
	 * @param {*} label label of the input element
	 * @param {*} data array of { value: "value", libelle: "libelle" }
	 * @param {*} required Whether the field is required or not
	 * @param {*} placeholder The placeholder
	 */
	constructor(label, data, msgValidation = null, required = false, placeholder = null, callback = null) {
		super(data, msgValidation, required, placeholder, callback);

		this.label = label;
	}



	render() {
		return /*html*/`
		<div id="container">
			<label for="myInput">${this.label}</label>
			<span id="c">
				<input type="text" id="myInput" name="myInput" placeholder="${this.placeholder ? this.placeholder : ''}" ${this.required ? 'required' : ''}>
			</span>
		</div>
		`;
	}


	renderCSS() {
		return /*css*/`
			${super.renderCSS()}
			
			#c {
				width: 60%;
			}
		`;
	}
}