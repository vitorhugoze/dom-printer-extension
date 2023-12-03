var stopExecution = false;

function HandleSelect() {
  stopExecution = false;

  const elements = document.getElementsByTagName("*");

  var myEl;

  for (let i = 0; i < elements.length; i++) {
    myEl = elements[i];

    if (
      myEl.getAttribute("p-selector") === null &&
      myEl.tagName.toLowerCase() != "script"
    ) {
      myEl.setAttribute("p-selector", `el${i}`);

      myEl.addEventListener("mouseover", function (e) {
        if (!stopExecution) {
          e.stopPropagation();
          this.style.scale = "1.05";
        }
      });

      myEl.addEventListener("mouseout", function (e) {
        if (!stopExecution) {
          e.stopPropagation();
          this.style.scale = "1.0";
        }
      });

      myEl.addEventListener("click", function (e) {
        if (!stopExecution) {
          SendMessage(e.target.getAttribute("p-selector"));

          window.clickedPrintEl = e.target.getAttribute("p-selector");
        }
      });
    }
  }
}
HandleSelect();

function SendMessage(id) {
  chrome.runtime.sendMessage({ message: id });
}
