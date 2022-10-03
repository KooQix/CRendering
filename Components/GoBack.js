import { Component } from "./Component.js";



export class GoBackComponent extends Component {

	constructor(callback) {
		super();
		this.default = true;
		this.callback = callback;
	}

	render() {
		return /*html*/`
		<div id="container">
			<a title="Retourner &agrave; l'accueil" class="flex-col" style="cursor: pointer">
				<img src="/BritlineManager/Content/icons/left-arrow.png" alt="Alternate Text" class="goBack" />
			</a>
		</div>
		`;
	}


	renderCSS() {
		return /*css*/`

		#container {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0;
		}

		a {
			margin: 0 !important;
		}

		a:hover {
			transform: scale(1.1) !important;
		}

		img {
			height: 2.5em !important;
		}
		`;
	}


	runEvents() {
		this.goBack();
	}


	/* =============== Events =============== */

	goBack() {
		this.__html__.querySelector("a")?.addEventListener("click", () => {
			this.callback();
		})
	}



	/* =============== Others =============== */


}
