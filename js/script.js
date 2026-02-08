// Efekt podążającego światła kursora
const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Obsługa nawigacji (chowanie topbaru i zmiana tła menu)
const navWrapper = document.getElementById("main-nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navWrapper.classList.add("scrolled");
  } else {
    navWrapper.classList.remove("scrolled");
  }
});

// Funkcja obsługi akcji (prosty alert)
function handleAction(type) {
  alert(`Wybrano: ${type}\nWkrótce uruchomimy system rezerwacji online.`);
}

// Płynne przewijanie do sekcji
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

window.addEventListener("scroll", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (window.scrollY > 100) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "0.8";
  }
});
