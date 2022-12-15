# CRendering - Minimalist Javascript library for components rendering

Highly customizable and flexible component rendering library

During an internship where I developed Web applications in C# .NET MVC, I missed the flexibility of a Javascript component rendering framework such as Angular, React or Vue. I regularly used the same type of components such as tables with various filtering or input with autocompletion and I found it time consuming to recreate it every time.

Since we could not download and use such libraries, I decided to implement this minimalist library, which I used for several projects during this internship.

It enables to easily reuse components

## Create a component

1. Create a new file YouComponent.js
2. Create a class inheriting from Component
3. Create a constructor, call the super method
4. Override the required methods such as render (return the HTML of the component), renderCSS (Return the CSS, scoped, of the component)
5. Add all the logic you need for the component

_See examples under the "ComponentExamples" directory_

## Use Component

-   Inside Javascript file

    1.  Import component
    2.  call Component constructor

-   Inside HTML file

    1.  Link js file

            <script src="main.js" type="module"></script>

    2.  Call the Tag of your component (Name of your class)

            <YourComponent></YourComponent>

_See main.js and index.html for a brief example of usage_
