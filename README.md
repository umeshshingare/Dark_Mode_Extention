# Dark & Bright Mode Chrome Extension

A versatile Chrome extension that allows you to switch between **Dark Mode**, **Bright Mode**, or **Auto mode** for any website with a single click.

## 🎯 Features

- 🌙 **Dark Mode** - Invert colors for comfortable viewing in low light.
- ☀️ **Bright Mode** - Enhance brightness and contrast for better daytime visibility
- 🌓 **Auto Mode** - Use the website in its default appearance
- 💾 **Per-domain settings** - Remembers your preference for each website independently
- 🔄 **Reset option** - Easily reset settings to Auto mode for any site
- 🎨 **Modern UI** - Clean and intuitive popup interface with three-mode selector
- ⚡ **Fast performance** - Lightweight and efficient, no unnecessary overhead
- 🔧 **One-click switching** - Instantly switch between modes without page reload

## 📋 Installation Guide

### Step 1: Clone or Download the Extension

```bash
# Clone from GitHub
git clone https://github.com/umeshshingare/Dark_Mode_Extention.git
cd Dark_Mode_Extention
```

Or download the ZIP file and extract it.

### Step 2: Open Chrome Extensions Page

1. Open **Google Chrome** browser
2. Type `chrome://extensions/` in the address bar and press Enter
3. Or navigate using: **Menu (⋮) → More Tools → Extensions**

### Step 3: Enable Developer Mode

1. Look for the toggle in the **top-right corner** of the extensions page
2. Click **"Developer mode"** to enable it

### Step 4: Load the Extension

1. Click the **"Load unpacked"** button (appears after enabling Developer mode)
2. Navigate to and select the `Dark_Mode_Extention` folder
3. The extension will appear in your extensions list
4. You should see the extension icon in your Chrome toolbar

### Step 5: Pin the Extension (Optional)

1. Click the **puzzle piece icon (🧩)** in your Chrome toolbar
2. Find **"Dark & Bright Mode"** in the list
3. Click the **pin icon** to keep it easily accessible

---

## 🎮 How to Use

### Toggle Theme Modes

1. **Click the extension icon** in your Chrome toolbar
2. The popup will display three buttons:
   - **🌓 Auto** - Website appears in its default state
   - **🌙 Dark** - Inverted colors for night viewing
   - **☀️ Bright** - Enhanced brightness and contrast
3. **Click your preferred mode** - Changes apply instantly to **ALL open and future websites**
4. Your choice is **automatically saved globally**

### Reset Website Settings

1. Click the extension icon
2. Scroll down and click **"Reset for this site"**
3. The mode resets to **Auto** across all websites
4. You can set it again anytime

### Global Theme Control

- The selected theme is **applied to all websites** uniformly
- All domains (websites) share the **same theme setting**
- Switch between modes anytime to affect all sites immediately
- Settings persist until you reset them or clear your browser data

---

## 🔧 Technical Details

### Manifest Version
- **Version 3** (Latest Chrome extension standard)

### Permissions Used
- `activeTab` - Allows the extension to access the current active tab
- `storage` - Saves your mode preferences globally

### How It Works

1. **Content Script** (`content.js`)
   - Runs automatically on every webpage
   - Applies CSS filters to modify the page appearance
   - Listens for mode change messages from the popup

2. **Popup UI** (`popup.js`)
   - Displays the three-mode selector interface
   - Detects the global mode setting
   - Sends mode change requests to all open tabs
   - Manages storage of user preferences globally

3. **Background Service Worker** (`background.js`)
   - Handles extension lifecycle
   - Manages communication between components

4. **Styling** (`popup.css`)
   - Beautiful responsive design
   - Clean button interface

### File Structure

```
Dark_Mode_Extention/
├── manifest.json              # Extension configuration
├── popup.html                 # Popup interface
├── popup.css                  # Popup styling
├── popup.js                   # Popup functionality (mode selection)
├── content.js                 # Content script (applies themes)
├── background.js              # Service worker
├── icons/                     # Extension icons
│   ├── icon16.png            # 16x16 pixels
│   ├── icon48.png            # 48x48 pixels
│   └── icon128.png           # 128x128 pixels
└── README.md                  # This file
```

---

## 🎨 Mode Details

### Dark Mode (🌙)
- Inverts all colors on the webpage (black ↔ white)
- Hue-rotates by 180° to maintain natural color balance
- Automatically inverts images and videos back to normal
- Perfect for night-time browsing
- Reduces eye strain in low-light environments

### Bright Mode (☀️)
- Increases brightness by 20%
- Enhances contrast by 10%
- Slightly increases color saturation
- Great for reading in bright daylight
- Improves text legibility

### Auto Mode (🌓)
- No filters applied
- Websites appear in their default state
- Your browser's automatic dark mode (if enabled) may still apply

---

## ⚙️ Advanced Usage

### Adding Custom Icons

1. Create three PNG images:
   - `icon16.png` (16×16 pixels)
   - `icon48.png` (48×48 pixels)
   - `icon128.png` (128×128 pixels)

2. Place them in the `icons/` folder

3. Reload the extension to see your custom icons

### Checking Storage Data

1. Open `chrome://extensions/`
2. Enable Developer mode
3. Click "Inspect views: service worker" on the extension
4. In DevTools, run:
   ```javascript
   chrome.storage.local.get(null, (items) => console.log(items));
   ```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Dark mode not working** | Refresh the webpage after toggling • Check extension is enabled in `chrome://extensions/` • Try resetting the extension |
| **Extension icon not visible** | Click puzzle piece (🧩) in toolbar • Find the extension and click the pin icon |
| **Preferences not saving** | Clear browser cache • Go to `chrome://extensions/` and click "Remove" then "Load unpacked" again |
| **Styles look strange** | Refresh the page • Clear storage using DevTools or reset the site |
| **Extension not responding** | Reload the extension: go to `chrome://extensions/` and toggle it off/on |

---

## 🌐 Browser Compatibility

| Browser | Support |
|---------|---------|
| **Chrome** | ✅ Full support (Manifest V3) |
| **Microsoft Edge** | ✅ Full support (Chromium-based) |
| **Brave** | ✅ Full support (Chromium-based) |
| **Opera** | ✅ Full support (Chromium-based) |
| **Firefox** | ❌ Not compatible (Uses different extension format) |
| **Safari** | ❌ Not compatible |

---

