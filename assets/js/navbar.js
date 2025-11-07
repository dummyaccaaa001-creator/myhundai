const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".navbar ul");

// Klik tombol ☰
toggle.addEventListener("click", () => {
  toggle.classList.toggle("active"); // animasi ☰ ↔ ✕
  nav.classList.toggle("show");      // tampilkan menu
});

// Tutup menu saat klik link
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("show");
    toggle.classList.remove("active");
  }
});

// Keyboard support (Enter)
toggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    toggle.classList.toggle("active");
    nav.classList.toggle("show");
  }
});
