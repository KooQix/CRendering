import { Component } from "./Component.js";
import { HeaderComponent } from "./HeaderComponent.js";


/**
 * Base form components
 * 
 * Params
 * @param {*} headerTitle 
 * @param {*} formElements Html of the elements of the form
 * @param {*} id 
 * 
 * Methods to override
 * @method async init() 
 * @method async initForm() after calling super.initForm()
 * @method submit() 
 * @method deleteEvents() 
 * 
 */
export class FormComponent extends Component {


	constructor(
		headerTitle,
		formElements,
		id = 0
	) {
		super();

		this.id = id;

		this.formElements = formElements;

		this.__initComponent__(headerTitle);
	}

	async init() { }


	__initComponent__(headerTitle) {
		setTimeout(() => {
			try {
				if (!this.__html__.querySelector("headercomponent")) throw new Error();

				new HeaderComponent(headerTitle);
				if (this.id !== 0) this.initForm(this.id)
				else {
					const deleteButton = this.__html__.querySelector("#delete");
					if (!!deleteButton)
						deleteButton.style.display = "none";
				}

			} catch (error) {
				setTimeout(() => {
					this.__initComponent__(headerTitle);
				}, 10);
			}
		}, 20);
	}




	render() {
		let elements = "";

		for (const elem of this.formElements) {
			elements += /*html*/`
			<span class="elem">
				${elem}
			</span>
			`;
		}

		return /*html*/`
		<form >
			<headercomponent></headercomponent>
			${elements}

			<input type="submit" class="button" value="Ajouter">
		</form>
		<div class="container">
			<button id="delete">Supprimer</button>
		</div>	
		`;
	}





	renderCSS() {
		return /*css*/`
		form {
			margin-top: 3em;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 2em;
		}


		.elem {
			margin-bottom: 1em;
			width: 40%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		input {
			width: 60%;
		}

		.button {
			margin-top: 2em;
			width: 30%;
		}

		headercomponent {
			margin-top: 1em;
			margin-bottom: 3em;
			width: 100%;
		}

		autocompleteinputcomponent {
			width: 100%;
		}

		.container {
			width: 20%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 5em;
			margin-bottom: 3em;
		}
		#delete {
			background-color: gray;
			width: 10%;
		}

		`;
	}

	runEvents() {
		this.submit();
		this.deleteEvent();
	}

	/**
	 * Fill in the form with client information when updating
	 * 
	 */
	async initForm() {
		try {
			this.__html__.querySelector(".button").value = "Modifier";
		} catch (error) {
			setTimeout(() => this.initForm(), 10);
		}

	}


	submit() {
		this.__html__.querySelector("form")?.addEventListener("submit", async () => {
			try {

				if (this.id === 0) {
					// Create
				}

				else {
					// Update
				}


			} catch (error) {
				console.log(error);
				alert("Une erreur est survenue lors de la création. Veuillez réessayer plus tard")
			}
		})

	}

	/**
	 * Event on click delete button => http request 
	 */
	deleteEvent() {
		this.__html__.querySelector("#delete")?.addEventListener("click", async () => {
			const res = confirm("Êtes-vous sûr de vouloir supprimer cet élément?");
			if (!res) return;

			try {
				// Delete and reload/go back
			} catch (error) {
				alert("Une erreur est survenue. Veuillez réessayer plus tard");
			}

		})
	}

}