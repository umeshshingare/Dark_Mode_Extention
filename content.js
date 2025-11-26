// Dark mode styles
const darkModeStyles = `
    /* Base dark mode styles */
    html {
        filter: invert(1) hue-rotate(180deg) !important;
        background-color: #ffffff !important;
    }
    
    /* Revert images and videos */
    img,
    picture,
    video,
    iframe,
    embed,
    object,
    canvas,
    svg {
        filter: invert(1) hue-rotate(180deg) !important;
    }
    
    /* Revert background images */
    [style*="background-image"] {
        filter: invert(1) hue-rotate(180deg) !important;
    }
    
    /* Fix for media that shouldn't be inverted */
    img[src*="data:image"],
    img[src*=".svg"],
    img[src*=".png"],
    img[src*=".jpg"],
    img[src*=".jpeg"],
    img[src*=".gif"],
    img[src*=".webp"] {
        filter: invert(1) hue-rotate(180deg) !important;
    }
`;

// Bright mode styles
const brightModeStyles = `
    /* Bright mode - increase brightness and contrast */
    html {
        filter: brightness(1.2) contrast(1.1) saturate(1.1) !important;
    }
    
    /* Enhance text readability */
    body {
        filter: brightness(1.1) !important;
    }
    
    /* Slightly enhance images but not too much */
    img,
    picture,
    video {
        filter: brightness(1.05) contrast(1.05) !important;
    }
`;

// Create style element
let styleElement = null;

// Check and apply the global mode setting
async function checkAndApplyMode() {
    const result = await chrome.storage.local.get(['globalMode']);
    const mode = result.globalMode || 'auto';
    
    applyMode(mode);
}

// Apply the specified mode
function applyMode(mode) {
    // Remove existing style if any
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
    
    // Apply mode-specific styles
    if (mode === 'dark') {
        styleElement = document.createElement('style');
        styleElement.id = 'theme-mode-extension';
        styleElement.textContent = darkModeStyles;
        document.head.appendChild(styleElement);
    } else if (mode === 'bright') {
        styleElement = document.createElement('style');
        styleElement.id = 'theme-mode-extension';
        styleElement.textContent = brightModeStyles;
        document.head.appendChild(styleElement);
    }
    // 'auto' mode doesn't apply any styles
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'setMode') {
        applyMode(request.mode);
        sendResponse({ success: true });
    }
    return true;
});

// Apply mode on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndApplyMode);
} else {
    checkAndApplyMode();
}

// Also check after a short delay to catch dynamically loaded content
setTimeout(checkAndApplyMode, 100);


