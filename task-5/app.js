// Theme Toggle Function
window.toggleTheme = function () {
  const body = document.body;
  const root = document.documentElement;
  const icon = document.getElementById("themeIcon");

  // Get current theme (default: light)
  let currentTheme = root.getAttribute("data-theme") || "light";
  let newTheme = currentTheme === "dark" ? "light" : "dark";

  // Apply new theme
  if (newTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    body.setAttribute("data-theme", "dark");
    if (icon) icon.className = "fa-solid fa-sun";
  } else {
    root.setAttribute("data-theme", "light");
    body.removeAttribute("data-theme");
    if (icon) icon.className = "fa-solid fa-moon";
  }

  // Save preference
  localStorage.setItem("theme", newTheme);
};

// On Page Load - Apply saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const root = document.documentElement;
  const body = document.body;
  const icon = document.getElementById("themeIcon");

  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    body.setAttribute("data-theme", "dark");
    if (icon) icon.className = "fa-solid fa-sun";
  } else {
    root.setAttribute("data-theme", "light");
    body.removeAttribute("data-theme");
    if (icon) icon.className = "fa-solid fa-moon";
  }
});

// Smooth scroll for navigation links
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}
