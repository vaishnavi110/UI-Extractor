# UI-Snipper
A Chrome extension (Manifest V3) to select and clone specific sections of any website. 

---

### 💡 Why I built this
As a developer, I often see a specific UI component (like a navbar, a card, or a button layout) and want to understand how it was built. Instead of digging through the "Inspect Element" tab, I built this to "snip" a section and extract its code instantly.

### 🚀 Core Features
* **Visual Selector:** Hover over any part of a webpage to highlight the element.
* **Smart Cloning:** It uses `getComputedStyle` to grab the actual CSS being rendered in the browser.
* **Component Extraction:** Ideal for taking a design "inspiration" and turning it into a clean code snippet.

### 🛠 The Tech Behind It
The main challenge was handling **CSS Inheritance**. Since styles are often inherited from parent containers, a simple copy-paste usually breaks the design. I wrote a recursive script that goes through the selected element and its children to map out the final styles.

### 📦 How to use it locally
1. **Clone** this repo to your machine.
2. Go to `chrome://extensions/` in your browser.
3. Turn on **Developer mode** (top right toggle).
4. Click **Load unpacked** and select this folder.
