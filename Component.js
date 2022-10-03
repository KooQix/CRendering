/**
 * Component rendering
 *
 * When extending component and redefining the constructor, must call super()!
 *
 * @param __name__ anchor tag of the component
 * @param __html__ component selector
 *
 * To override:
 * @method render() Html of the component
 * @method renderCSS() CSS of the component (scoped)
 * @method runEvents() Every events the component has to run
 * @method async init() Method called just after the creation of the object
 *
 * To use:
 * @method __ refresh __() Update the UI
 * @method __ hide __() Hide the component
 * @method __ display __() Display the component
 */
export class Component {
	static components = {};

	constructor() {
		this.nbRefresh = 0;

		// Anchor name of the component
		this.__name__ = this.constructor.name;
		// Html element of the component

		// Component hasn't been created yet, init
		if (!!!Component.components[this.__name__])
			Component.components[this.__name__] = 0;

		this.__html__ = document.querySelectorAll(this.__name__)[
			Component.components[this.__name__]
		];

		Component.components[this.__name__] += 1;

		// Render the component
		this.__init__();

		let interval = setInterval(async () => {
			try {
				await this.init();
				clearInterval(interval);
			} catch (error) {
				console.log(error);
			}
		}, 20);
	}

	/* =============== Methods, not to override nor use =============== */

	/**
	 * Initialize component
	 */
	__init__() {
		setTimeout(() => {
			try {
				this.__refresh__();
				this.nbRefresh++;
			} catch (error) {
				console.log(error);

				if (this.nbRefresh > 10) return;

				setTimeout(() => this.__init__(), 10);
			}
		}, 10);
	}

	/**
	 * Method called just after the creation of the object.
	 */
	async init() {}

	/**
	 * Format the CSS for rendering (not to override when extending Component)
	 * Scoped CSS e.g solely for this component
	 *
	 * @returns Formatted CSS
	 */
	__renderCSS__() {
		// Default: component takes the full width of its parent
		let res = `${this.__name__} { width: 100%; }`;

		let split = this.renderCSS().split("}");
		for (let elem of split) {
			res += `
			${this.__name__} ${elem}
			}
			`;
		}

		return res;
	}

	/* =============== Methods to use but not override =============== */

	/**
	 * Update view
	 */
	__refresh__() {
		if (this.nbRefresh > 10) return;

		this.__html__.innerHTML = this.render();

		// Add CSS rendering
		this.__html__.innerHTML += /*html*/ `
		<style >
			${this.__renderCSS__()}				
		</style>
		`;
		this.runEvents();
	}

	/**
	 * Show the component
	 */
	__display__() {
		this.__html__.style.display = "";
	}

	/**
	 * Hide the component
	 */
	__hide__() {
		this.__html__.style.display = "none";
	}

	/* =============== Methods to override =============== */

	/**
	 * Render the HTML of the component
	 *
	 * @returns The HTML of the component
	 */
	render() {
		return /*html*/ `
		<!-- <h3>Hello World!</h3> -->
		`;
	}

	/**
	 * Render the CSS of the component
	 *
	 * @returns The CSS of the component
	 */
	renderCSS() {
		return /*css*/ `
			/* h3 {
				color: blue;
			} */
		`;
	}

	/**
	 * A list of event listeners to start
	 * List the functions calling the events
	 */
	runEvents() {
		//
	}

	/* =============== Other methods =============== */

	/* =============== Managing Component.components =============== */

	resetCount() {
		try {
			delete Component.components[this.__name__];
		} catch (error) {}
	}

	/**
	 * Decrease count of component of this type
	 * @returns
	 */
	decreaseCount() {
		try {
			Component.components[this.__name__]--;
		} catch (error) {}
	}

	increaseCount() {
		try {
			Component.components[this.__name__]++;
		} catch (error) {}
	}
}
