const handleClick = (tab) => {
  if (!tab.id) throw new Error("tab id not found")
  chrome.scripting.insertCSS({
    css: "body { transform: scaleX(-1); }",
    target: { tabId: tab.id }
  })
}

if (chrome.action != undefined) {
  chrome.action.onClicked.addListener(handleClick)
} else {
  chrome.browserAction.onClicked.addListener(handleClick)
}
