// Function to switch theme
    function switchTheme(themeName) {
      document.documentElement.className = themeName;
      localStorage.setItem('theme', themeName);
    }

    document.getElementById('light-theme-1-btn').addEventListener('click', function () {
      switchTheme('light-theme-1');
    });

    document.getElementById('light-theme-2-btn').addEventListener('click', function () {
      switchTheme('light-theme-2');
    });

    document.getElementById('dark-theme-1-btn').addEventListener('click', function () {
      switchTheme('dark-theme-1');
    });

    document.getElementById('dark-theme-2-btn').addEventListener('click', function () {
      switchTheme('dark-theme-2');
    });

    document.addEventListener('DOMContentLoaded', (event) => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        switchTheme(savedTheme);
      }
    });
