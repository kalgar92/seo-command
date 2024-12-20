chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'openSettings':
      chrome.runtime.openOptionsPage();
      break;
    case 'openHistory':
      chrome.tabs.create({ url: 'chrome://history' });
      break;
    case 'openBookmarks':
      chrome.tabs.create({ url: 'chrome://bookmarks' });
      break;
    case 'downloadPage':
      chrome.downloads.download({
        url: sender.tab.url,
        filename: 'page.html'
      });
      break;
  }
});