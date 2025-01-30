const handleClick = (tab) => {
  if (!tab.id) {
    throw new Error("tab id not found")
  }
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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    if (!tab.id) {
      throw new Error("tab id not found")
    }
    if (
      tab.url.includes("https://studio.youtube.com/live_chat") ||
      tab.url.match(/https:\/\/www\.twitch\.tv\/popout\/([^\/]+)\/chat/)
    ) {
      chrome.scripting.insertCSS({
        css: "body { transform: scaleX(-1); }",
        target: { tabId: tab.id }
      })
    }
  }
})
