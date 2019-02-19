let timerLink

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case "pageChanged":
      injectTimerLink()
      break
  }
})

const injectTimerLink = () => {
  console.log('JT: Looking for task id...')

  // Remove existing button
  if (document.getElementById('jira-timer-button'))
    document.getElementById('jira-timer-button').outerHTML = ''
  
  let currentTaskKey

  const metaIssueKey = findTaskInMeta()
  if (metaIssueKey)
    currentTaskKey = metaIssueKey

  const urlIssueKey = findTaskInURL()
  if (urlIssueKey)
    currentTaskKey = urlIssueKey

  // Inject button if we have a task key
  if (currentTaskKey) {
    console.log('JT: Injecting timer link for', currentTaskKey)

    timerLink = document.createElement('a')
    let timerLinkText = document.createTextNode(`Start timing ${currentTaskKey}`)
    timerLink.appendChild(timerLinkText)
    timerLink.setAttribute('href', `jiratimer://start-timer/${currentTaskKey}`);
    timerLink.setAttribute('id', 'jira-timer-button')
    
    document.body.appendChild(timerLink)
  }
}

const findTaskInMeta = () => {
  const metaCurrentTaskKey = document.head.querySelector("[name=ajs-issuekey][content]")
  console.log('JT: Found key in meta?', metaCurrentTaskKey)

  if (!metaCurrentTaskKey)
    return false 
  else
    return metaCurrentTaskKey.content
}

const findTaskInURL = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const urlIssueKey = urlParams.get('selectedIssue')

  console.log('JT: Found issue key in URL?', urlIssueKey)

  return urlIssueKey
}

injectTimerLink()