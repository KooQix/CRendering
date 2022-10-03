import { Component } from "./Component.js";



/**
 * Formated Header
 */
export class HeaderComponent extends Component {
	
	constructor(title) {
		super();
		this.title = title;
	}

	render() {
		return /*html*/`
		<div>
			<span id="switch-table" class="marginB-3 flex-col">
				<p class="title">${this.title}</p>
			</span>
		</div>
		`;
	}

	renderCSS() {
		return /*css*/`

		div {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-top: 1em;
		}

		#switch-table {
			width: 30%;
			border-bottom: 2px solid #03a9f4;
		}

		.title {
			cursor: default;
			font-size: 1.8em;
			font-style: italic;
		}
		`;
	}
}