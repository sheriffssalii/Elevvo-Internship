const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  // icon changing
    const icon = toggleBtn.querySelector("i");
        if (sidebar.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
        } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    }
});
