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

  let metaCurrentTaskKey = document.head.querySelector("[name=ajs-issue-key][content]")

  console.log('JT: Found key?', metaCurrentTaskKey)

  // Inject button if we have a task key
  if (metaCurrentTaskKey) {
    let currentTaskKey = metaCurrentTaskKey.content

    console.log('JT: Injecting timer link')

    timerLink = document.createElement('a')
    let timerLinkText = document.createTextNode(`Start timing ${currentTaskKey}`)
    timerLink.appendChild(timerLinkText)
    timerLink.setAttribute('href', `jiratimer://start-timer/${currentTaskKey}`);
    timerLink.setAttribute('id', 'jira-timer-button')
    
    document.body.appendChild(timerLink)
  }
}

injectTimerLink()