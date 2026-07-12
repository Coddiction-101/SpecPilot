(function () {
  var STORAGE_KEY = "specpilot-theme";
  var root = document.documentElement;
  var toggleBtn = document.getElementById("theme-toggle");

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggleBtn) {
      toggleBtn.setAttribute(
        "aria-pressed",
        theme === "dark" ? "true" : "false",
      );
      toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
      );
    }
  }

  applyTheme(currentTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
    });
  }

  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY && event.newValue) {
      applyTheme(event.newValue);
    }
  });
})();
