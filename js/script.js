document.addEventListener("DOMContentLoaded", () => {
  const navWrapper = document.getElementById("main-nav");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const cursor = document.querySelector(".cursor-glow");

  // 1. Zoptymalizowana obsługa przewijania
  const handleScroll = () => {
    const scrollValue = window.scrollY;

    // Dodawanie klasy z lekkim marginesem bezpieczeństwa
    if (scrollValue > 20) {
      navWrapper.classList.add("scrolled");
    } else {
      navWrapper.classList.remove("scrolled");
    }

    if (scrollIndicator) {
      scrollIndicator.style.opacity = scrollValue > 100 ? "0" : "0.8";
      scrollIndicator.style.pointerEvents = scrollValue > 100 ? "none" : "auto";
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Wywołanie na starcie w razie odświeżenia strony w połowie

  // 2. Efekt kursora (z ograniczeniem klatkażu)
  let tick = false;
  document.addEventListener("mousemove", (e) => {
    if (!tick) {
      window.requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
        }
        tick = false;
      });
      tick = true;
    }
  });

  // 3. Ulepszone płynne przewijanie
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

function handleAction(type) {
  alert(`Wybrano: ${type}\nWkrótce uruchomimy system rezerwacji online.`);
}
