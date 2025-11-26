// Get DOM elements
const autoBtn = document.getElementById('autoBtn');
const darkBtn = document.getElementById('darkBtn');
const brightBtn = document.getElementById('brightBtn');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');

// Get current tab
let currentTab = null;

// Mode names mapping
const modeNames = {
    auto: 'Auto',
    dark: 'Dark',
    bright: 'Bright'
};

// Initialize popup
async function init() {
    // Get current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTab = tab;
    
    // Get stored mode for this domain
    const domain = new URL(tab.url).hostname;
    const result = await chrome.storage.local.get([domain]);
    const currentMode = result[domain] || 'auto';
    
    // Update UI
    updateUI(currentMode);
    
    // Set up event listeners
    autoBtn.addEventListener('click', () => handleModeChange('auto'));
    darkBtn.addEventListener('click', () => handleModeChange('dark'));
    brightBtn.addEventListener('click', () => handleModeChange('bright'));
    resetBtn.addEventListener('click', handleReset);
}

// Update UI based on mode
function updateUI(mode) {
    // Remove active class from all buttons
    autoBtn.classList.remove('active');
    darkBtn.classList.remove('active');
    brightBtn.classList.remove('active');
    
    // Add active class to selected button
    if (mode === 'auto') {
        autoBtn.classList.add('active');
    } else if (mode === 'dark') {
        darkBtn.classList.add('active');
    } else if (mode === 'bright') {
        brightBtn.classList.add('active');
    }
    
    // Update status text
    statusText.textContent = `Current mode: ${modeNames[mode]}`;
}

// Handle mode change
async function handleModeChange(mode) {
    const domain = new URL(currentTab.url).hostname;
    
    // Save mode preference
    await chrome.storage.local.set({ [domain]: mode });
    
    // Update UI
    updateUI(mode);
    
    // Send message to content script
    try {
        await chrome.tabs.sendMessage(currentTab.id, {
            action: 'setMode',
            mode: mode
        });
    } catch (error) {
        // If content script hasn't loaded, reload the page
        console.log('Content script not ready, reloading page...');
        await chrome.tabs.reload(currentTab.id);
    }
}

// Handle reset
async function handleReset() {
    const domain = new URL(currentTab.url).hostname;
    
    // Remove stored mode (defaults to auto)
    await chrome.storage.local.remove([domain]);
    
    // Update UI
    updateUI('auto');
    
    // Send message to content script to set to auto
    try {
        await chrome.tabs.sendMessage(currentTab.id, {
            action: 'setMode',
            mode: 'auto'
        });
    } catch (error) {
        // Reload page if content script not ready
        await chrome.tabs.reload(currentTab.id);
    }
}

// Initialize when popup opens
init();


