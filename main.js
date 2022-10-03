import { AutocompleteInputComponent } from "./ComponentExamples/AutocompleteInput.js";

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

// Creating the component
new AutocompleteInputComponent(
	mockDataAutocomplete,
	"Please, select an element among those in the list",
	true,
	"ex: France",
	(index) => {
		alert("You selected: " + mockDataAutocomplete[index]);
	},
);

//////////////////// Datatable \\\\\\\\\\\\\\\\\\\\

// Mock data

// Creating component
