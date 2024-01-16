# Sorting Visualizer

Welcome to the Sorting Visualizer project! This interactive web application is designed to provide a visual representation of various sorting algorithms, allowing users to observe and comprehend their functionalities. The project is implemented using HTML, CSS, and JavaScript, with auxiliary support from the `math.js` and `column.js` files.

## Files

### 1. index.html

This file forms the backbone of the web page, defining its structure and incorporating essential elements for user interaction. The interface includes sorting buttons and a description div that dynamically updates based on user actions.

### 2. style.css

The CSS file (`style.css`) enhances the visual appeal of the sorting visualizer. It contributes to the overall aesthetics by specifying layout configurations, color schemes, and animations used throughout the project.

### 3. script.js

The primary JavaScript file (`script.js`) is responsible for handling user interactions, initializing the array, and implementing the sorting algorithms. Key features of this file include:

- #### `init` Function

  This function initializes the array that will be visualized during the sorting process.

- #### Sorting Algorithms

  - **Bubble Sort**
  - **Heap Sort**
  - **Cycle Sort**
  - **Selection Sort**
  - **Comb Sort**
  - **Stooge Sort**
  - **Gnome Sort**
  - **Cocktail Shaker Sort**
  - **Intro Sort**
  - **Odd-Even Sort**

### 4. math.js

The `math.js` file introduces a `lerp` function, which stands for linear interpolation. This function is crucial for calculating intermediate values, facilitating smooth animations during the visualization of the sorting process.

### 5. column.js

The `column.js` file plays a pivotal role in creating and updating the visual representation of the array. It utilizes columns or bars to dynamically display the sorting process in tandem with the `script.js` file.

## Usage

1. Open the `index.html` file in a web browser.
2. Click on the sorting algorithm buttons to initiate the visualization of the sorting process.
3. The description of the selected sorting algorithm will be dynamically displayed in the description div.

Feel free to explore the visualizations and gain insights into the inner workings of different sorting algorithms. This Sorting Visualizer serves as an educational tool to foster a deeper understanding of sorting techniques. Enjoy your exploration and happy sorting!