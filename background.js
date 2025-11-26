// Background service worker for Chrome extension
// Handles installation and updates

chrome.runtime.onInstalled.addListener(() => {
    console.log('Dark Mode Extension installed');
});

// Listen for extension icon click to ensure content script is injected
chrome.action.onClicked.addListener(async (tab) => {
    // The popup will handle the toggle, but we ensure the content script is ready
    try {
        await chrome.tabs.sendMessage(tab.id, { action: 'ping' });
    } catch (error) {
        // Content script might not be loaded yet, that's okay
        console.log('Content script not ready yet');
    }
});


