# 🌊 Oceanfilms CircularWidgets

A high-performance, visually stunning circular widget spinner built with **SVG** and **GSAP**. This project features a smooth, interactive carousel that rotates widgets in a circular layout, perfect for portfolios, feature highlights, or creative navigation.

![Project Preview](https://via.placeholder.com/800x400.png?text=Oceanfilms+CircularWidgets+Interface) *<!-- Note to User: Replace this with an actual screenshot of your project -->*

## ✨ Features

- **Interactive Circular Spinner**: Smooth rotation using SVG paths and `clipPath`.
- **GSAP Animations**: Fluid transitions for rotation and image reveals.
- **Scroll Interaction**: Rotate the spinner using the mouse wheel.
- **Dynamic Content**: Automatically updates titles and preview images based on the active segment.
- **Responsive Design**: Automatically resizes and re-renders the SVG on window resize.
- **Premium Aesthetics**: Dark mode default with sleek "Geist Mono" typography and vibrant highlights.

## 🛠️ Tech Stack

- **HTML5**: Semantic structure.
- **CSS3**: Custom properties, fixed layout, and modern typography.
- **JavaScript (ES6+)**: Core logic, LERP (Linear Interpolation) for smooth motion.
- **GSAP (GreenSock Animation Platform)**: Handles complex animations and timing.
- **SVG**: For the circular geometry and precise image clipping.

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- A local server (like Live Server in VS Code) for the best experience.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Thakuma07/OceanFilms-SVGSilder.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd OceanFilms-SVGSilder
   ```
3. **Open `index.html`**:
   Launch it in your favorite browser.

## 🕹️ Usage

- **Scroll Wheel**: Rotate the indicator and the widget spinner.
- **Visual Feedback**: The indicator line points to the active widget, updating the center text and background preview.

## 📁 Project Structure

```text
OceanFilms/
├── assets/           # Project images and icons
├── fonts/            # Custom typefaces (Geist Mono)
├── index.html        # Main entry point
├── script.js         # Animation and SVG logic
├── styles.css        # Visual styling and layout
└── README.md         # You are here!
```

## ⚙️ Customization

To add your own widgets, modify the `widgets` array in `script.js`:

```javascript
const widgets = [
    { image: "./assets/your-image.jpg", name: "Your Widget Name" },
    // ... add more objects here
];
```
The SVG will automatically calculate the segment angles based on the number of items in this array.


