# JavaScript Assignment 7: DOM Events, Manipulation, and Interactive UI Components

This repository directory contains complete, interactive solutions for **Assignment 7** of the BridgeLabz Training program, focusing on core JavaScript DOM manipulation, event delegation, event capturing vs bubbling, propagation control (`stopPropagation()`), form event prevention (`preventDefault()`), dynamic attribute manipulation (`setAttribute()`), and coordinates logging.

---

## 📁 Folder Structure

```
js7/
├── index.html         # Unified execution dashboard + interactive live preview sandbox
├── question1.js       # Q1: Dynamic Product List Manager (Add, Edit, Delete – Event Delegation)
├── question2.js       # Q2: Live Character Counter with Warning Behavior
├── question3.js       # Q3: Multi-Step Form with Next/Back & Validation
├── question4.js       # Q4: Theme Switcher Using Attribute Manipulation (setAttribute)
├── question5.js       # Q5: Image Gallery with Modal Preview (stopPropagation)
├── question6.js       # Q6: Real-Time Table Filter Using input Event
├── question7.js       # Q7: Detect Mouse Path & Coordinates Logger (400x400 Box)
├── question8.js       # Q8: Custom Dropdown (No <select> Tag, Capturing Phase Closure)
├── question9.js       # Q9: Form Submit Blocker with preventDefault() & Live Errors
└── README.md          # Assignment documentation
```

---

## 🚀 Execution Instructions

### Run via Node.js (Automated Test Simulation)
```bash
node js7/question1.js
node js7/question2.js
node js7/question3.js
node js7/question4.js
node js7/question5.js
node js7/question6.js
node js7/question7.js
node js7/question8.js
node js7/question9.js
```

### Run via Interactive Browser Dashboard
Open `js7/index.html` in your browser.
- Click **"▶ Run All 9 Scripts"** to execute the console verification suite.
- Click **"Live Demo ↗"** on any card to mount its interactive UI widget in the live sandbox.

---

## 📝 Problem Summary & Solution Architecture

| Problem | Key Concepts | Implementation Details |
| :--- | :--- | :--- |
| **Q1: Product List Manager** | Event Delegation, Inline Editing | Event listener attached to parent `<ul>` handles edit and delete actions on child `<li>` elements. Auto-saves changes when clicking outside the active input. |
| **Q2: Live Character Counter** | Textarea Events, `preventDefault()` | 100-character limit counter with color transitions: green (&gt;20 left), yellow (&le;20 left), and red at 0. Blocks typing at 0 chars using `e.preventDefault()`, with a reset button. |
| **Q3: Multi-Step Form** | Wizard Navigation, Step Validation | 3-step form (Name &rarr; Email &rarr; Password). "Next" button validates input before proceeding; "Back" returns to previous step; displays summary on completion. |
| **Q4: Theme Switcher** | `setAttribute()`, Data Attributes | 3 themes (Light, Dark, Blue) applied to `<body>` using `setAttribute('class', ...)` and saved in custom attribute `data-theme="..."`. |
| **Q5: Image Gallery Modal** | `event.stopPropagation()`, Overlays | 6-image grid. Clicking an image opens a modal preview. Clicking the overlay closes the modal; `event.stopPropagation()` prevents inside clicks from closing it. |
| **Q6: Real-Time Table Filter** | `input` Event, Reactive DOM | Filters a table of students by Name, Branch, or CGPA on every keystroke. Case-insensitive matching with "No results found" fallback row. |
| **Q7: Mouse Coordinates Logger** | `mousemove`, `dblclick`, Canvas Math | 400&times;400 box tracking live `clientX` and `clientY`. Double-clicking drops a styled red dot at the exact click coordinates. |
| **Q8: Custom Dropdown** | Event Capturing (`useCapture: true`) | Accessible dropdown without `<select>`. Button updates to chosen option; outside clicks close the menu using a document listener registered on the **capturing phase**. |
| **Q9: Form Submit Blocker** | `preventDefault()`, Live Error Clear | Form validator blocking submission with `e.preventDefault()`. Displays inline errors that automatically disappear as soon as the user corrects each field. |

---

## 🛠️ Verification
All 9 questions have been tested in Node.js v24.14.0 and in modern browsers with zero external libraries.
