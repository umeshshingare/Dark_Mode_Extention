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
    
    // Get global mode setting
    const result = await chrome.storage.local.get(['globalMode']);
    const currentMode = result.globalMode || 'auto';
    
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
    // Save mode preference globally
    await chrome.storage.local.set({ globalMode: mode });
    
    // Update UI
    updateUI(mode);
    
    // Send message to all tabs to apply the new mode
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
        try {
            await chrome.tabs.sendMessage(tab.id, {
                action: 'setMode',
                mode: mode
            });
        } catch (error) {
            // Tab might not have content script, skip it
            console.log('Could not send message to tab:', tab.id);
        }
    }
}

// Handle reset
async function handleReset() {
    // Reset to auto mode globally
    await chrome.storage.local.set({ globalMode: 'auto' });
    
    // Update UI
    updateUI('auto');
    
    // Send message to all tabs to set to auto
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
        try {
            await chrome.tabs.sendMessage(tab.id, {
                action: 'setMode',
                mode: 'auto'
            });
        } catch (error) {
            // Tab might not have content script, skip it
            console.log('Could not send message to tab:', tab.id);
        }
    }
}

// Initialize when popup opens
init();


