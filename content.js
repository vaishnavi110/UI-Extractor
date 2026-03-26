let isSelecting = false;
let selectionMode = null;

chrome.runtime.onMessage.addListener((msg) => {

  if (msg.type === "SELECT_LAYOUT") {
    selectionMode = "layout";
    enableSelection();
  }

  if (msg.type === "SELECT_TEXT") {
    selectionMode = "text";
    enableSelection();
  }

});


function enableSelection() {
  isSelecting = true;
  document.body.style.cursor = "crosshair";

  function highlight(e) {
    e.target.style.outline = "2px solid red";
  }

  function select(e) {
    e.preventDefault();
    e.stopPropagation();

    document.body.style.cursor = "default";
    document.removeEventListener("mouseover", highlight);
    document.removeEventListener("click", select, true);

    document.querySelectorAll("*").forEach(el => {
  el.style.outline = "";
});

   const root = findLogicalContainer(e.target);

if (selectionMode === "layout") {
  const clone = cloneWithInlineStyles(root);
  downloadLayout(clone.outerHTML);
}

if (selectionMode === "text") {
  const textContent = root.innerText;
  downloadText(textContent);
}

  }

  document.addEventListener("mouseover", highlight);
  document.addEventListener("click", select, true);
}

function findLogicalContainer(element) {
  while (element && element !== document.body) {
    const style = window.getComputedStyle(element);

    if (
      style.display === "flex" ||
      style.display === "grid" ||
      element.tagName === "SECTION"
    ) {
      return element;
    }

    element = element.parentElement;
  }

  return element;
}

function cloneWithInlineStyles(element) {
  const clone = element.cloneNode(true);

  function applyStyles(original, copy) {
    const computed = window.getComputedStyle(original);
    let cssText = "";

    for (let i = 0; i < computed.length; i++) {
      const prop = computed[i];
      cssText += `${prop}:${computed.getPropertyValue(prop)};`;
    }

    copy.style.cssText = cssText;

    if (copy.tagName === "IMG") {
      copy.src = new URL(original.src).href;
    }

    Array.from(original.children).forEach((child, i) => {
      applyStyles(child, copy.children[i]);
    });
  }

  applyStyles(element, clone);
  return clone;
}

function downloadLayout(htmlContent) {
  const fullDocument = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Cloned Section</title>
  </head>
  <body>
    ${htmlContent}
  </body>
  </html>
  `;

  const dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent(fullDocument);

  chrome.runtime.sendMessage({
    type: "DOWNLOAD_FILE",
    url: dataUrl,
    filename: `ClonedSections/layout-${Date.now()}.html`
  });

}


function downloadText(textContent) {

  const dataUrl = "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);

  chrome.runtime.sendMessage({
    type: "DOWNLOAD_FILE",
    url: dataUrl,
    filename: `ClonedSections/text-${Date.now()}.txt`
  });
}