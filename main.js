import { AutocompleteInputComponent } from "./ComponentExamples/AutocompleteInput.js";
import { DataTableComponent } from "./ComponentExamples/DataTable.js";

//////////////////// Autocomplete \\\\\\\\\\\\\\\\\\\\

// Some mock data
const mockDataAutocomplete = [
	{
		value: "0",
		displayName: "France",
	},
	{
		value: "1",
		displayName: "United States",
	},
	{
		value: "2",
		displayName: "United Kingdom",
	},
	{
		value: "3",
		displayName: "India",
	},
];

// Create the component
new AutocompleteInputComponent(
	mockDataAutocomplete,
	"Please, select an element among those in the list",
	true,
	"ex: France",
	(index) => {
		alert("You selected: " + mockDataAutocomplete[index].displayName);
	},
);

//////////////////// Datatable \\\\\\\\\\\\\\\\\\\\

// Mock data

const tableHeaders = ["Country", "Population (millions)", "Capital"];

const data = [
	["France", 67.5, "Paris"],
	["United States", 331.9, "Washington, DC"],
	["England", 55.98, "London"],
];

// Create component

new DataTableComponent(
	tableHeaders,
	data,
	(index) => alert(`You clicked on ${data[index][0]}!`),
	true,
);
