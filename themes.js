// Array of theme names
const themes = ['light-theme-1', 'light-theme-2', 'dark-theme-1', 'dark-theme-2'];
// Variable to store the index of the current theme
let currentThemeIndex = 0;

// Function to switch theme
function switchTheme(themeName) {
  document.documentElement.className = themeName;
  localStorage.setItem('theme', themeName);
}

// Function to switch to the next theme
function switchToNextTheme() {
  // Increment the current theme index, wrapping around to 0 if it reaches the number of themes
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  // Switch to the new theme
  switchTheme(themes[currentThemeIndex]);
}

// Add event listener to 'Change Theme' button
document.getElementById('theme-switcher-button').addEventListener('click', switchToNextTheme);

document.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve the saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    // If a theme was saved, set it as the current theme
    switchTheme(savedTheme);
    // Also update the current theme index
    currentThemeIndex = themes.indexOf(savedTheme);
  }
});
