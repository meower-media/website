// Function to switch theme
function switchTheme(themeName) {
  document.documentElement.className = themeName;
  localStorage.setItem('theme', themeName);
}

// Get all themes in an array
const themes = ['light-theme-1', 'light-theme-2', 'dark-theme-1', 'dark-theme-2'];

// Get theme switcher button
let themeSwitcherButton = document.getElementById('theme-switcher-button');

// Event listener for the theme switcher button
themeSwitcherButton.addEventListener('click', function () {
  // Get current theme from local storage
  let currentTheme = localStorage.getItem('theme');

  // If there's no theme set in local storage, set it to the first theme
  if (!currentTheme) {
    currentTheme = themes[0];
  }

  // Find the index of the current theme in our array
  let currentIndex = themes.indexOf(currentTheme);

  // If current theme is the last in the array, loop back to the first theme
  // Else, move to the next theme
  let nextIndex = (currentIndex + 1) % themes.length;

  // Switch to the next theme
  switchTheme(themes[nextIndex]);
});

// On page load, set theme to saved theme or the first theme if no theme is saved
document.addEventListener('DOMContentLoaded', (event) => {
  let savedTheme = localStorage.getItem('theme') || themes[0];
  switchTheme(savedTheme);
});
