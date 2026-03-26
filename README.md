UI-Extractor
A Chrome extension (Manifest V3) to select and clone specific sections of any website.

Why I built this
As a developer, I often see a specific UI component (like a navbar, a card, or a button layout) on a website and want to see how it was built. Instead of manually digging through the "Inspect Element" tab and trying to find which CSS belongs to which div, I built this tool to "snip" a section and extract its code instantly.

Core Features
Visual Selector: Hover over any part of a webpage to highlight the element.

Smart Cloning: It doesn't just copy the HTML; it uses getComputedStyle to grab the actual CSS being rendered in the browser.

Component Extraction: Ideal for taking a design "inspiration" and turning it into a clean code snippet for a new project.

The Tech Behind It
The main challenge was handling CSS Inheritance. Since many styles are inherited from parent containers, a simple copy-paste of a div usually breaks the design. I wrote a recursive script that goes through the selected element and its children to map out the final styles so the "clone" looks exactly like the original.

How to use it locally
Clone this repo.

Go to chrome://extensions/ in your browser.

Turn on Developer mode (top right).

Click Load unpacked and select this folder.
