// JIRA is a SPA so we need to detect page transitions
chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  if (details.url.includes('atlassian.net')) {
    console.log('JT: Page changed', details)
    sendMessageToContent({ 'message': 'pageChanged' })
  }
})

function sendMessageToContent(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}