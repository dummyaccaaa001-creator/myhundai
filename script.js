document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".navbar ul");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});
