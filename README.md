# Closest Pair Visualization Project

This project is an interactive visualization of the **Closest Pair of Points** problem using HTML, CSS, and JavaScript. The visualization allows users to input points and dynamically shows the closest pair of points through an animation.

## Features
- Users can add multiple points by entering their coordinates.
- Points are plotted on a grid (canvas) in real-time.
- The program calculates and visualizes the closest pair of points using the divide and conquer algorithm.
- Animation and visualization of the dividing process, including intermediate steps.

## Technologies Used
- **HTML5** for the structure of the webpage.
- **CSS3** for basic styling.
- **JavaScript** for the logic and canvas rendering of the visualization.

## Getting Started

### Prerequisites
To run this project, you'll need:
- A modern web browser that supports HTML5 and JavaScript.
- Basic knowledge of how to run an HTML file.

### Running the Project
1. **Clone the repository** or download the project files to your local machine:
   ```bash
   git clone https://github.com/yourusername/repositoryname.git
   ```
2. **Open the project folder** and locate the `index.html` file.
3. Double-click the `index.html` file to open it in your browser.

### Instructions
1. Once the page loads, you will see input fields to enter the coordinates of points (x and y values).
2. Click the **"Add Point"** button to add additional points.
3. After entering at least two points, click **"Start Visualization"** to begin the animation.
4. The closest pair of points will be calculated, and the process will be visualized step-by-step.

### How It Works
- Points are plotted on a canvas, and the closest pair is calculated using a **Divide and Conquer** approach.
- The algorithm recursively divides the points and finds the minimum distance between points in each division.
- A visual divider line appears on the canvas to show how the points are being divided.
- Lines are drawn between the closest points, and distances are shown in real-time.

## Project Structure
```
├── index.html       # The main HTML file
├── styles.css       # The stylesheet (if any additional styles are applied)
└── script.js        # The JavaScript logic for the visualization
```

## Future Improvements
- Add the ability to reset the canvas without refreshing the page.
- Improve UI/UX design by adding better color schemes and animations.
- Include more advanced algorithms for larger datasets.

## License
This project is licensed under the MIT License.

---

Feel free to modify it to fit your specific needs! Let me know if you need any additional sections or details.
