try {
  var lastTime = Date.now();

  var btnEl = document.getElementById("select-btn");

  messageListener();

  if (btnEl != undefined) {
    btnEl.addEventListener("click", () => {
      tabScripting("content.js", true);
    });
  }

  chrome.runtime.onSuspend.addListener(() => {
    tabScripting("suspend.js", false);
  });
} catch (error) {
  console.log(error);
}

function tabScripting(scriptFile: string, tabFilter: boolean) {
  var queryFilter: chrome.tabs.QueryInfo;

  if (tabFilter) {
    queryFilter = { active: true, currentWindow: true };
  } else {
    queryFilter = {};
  }

  chrome.tabs.query(queryFilter, (tabs) => {
    var currTabId = tabs[0].id;

    if (currTabId != undefined) {
      chrome.scripting.executeScript({
        target: { tabId: currTabId },
        files: [scriptFile],
      });
    }
  });
}

function messageListener() {
  const injectionMap = new Map<string, string>([
    ["png", "dom-to-image-png.min.js"],
    ["jpg", "dom-to-image-jpg.min.js"],
    ["svg", "dom-to-image-svg.min.js"],
  ]);

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    const printFormat = <HTMLInputElement>(
      document.querySelector('input[name="print"]:checked')!
    );

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      var currTabId = tabs[0].id;

      if (currTabId != undefined && Date.now() - lastTime > 1000) {
        lastTime = Date.now();
        console.log("printing element");
        tabScripting(injectionMap.get(printFormat.value), true);
      }
    });
  });
}
