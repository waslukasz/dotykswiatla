document.addEventListener("DOMContentLoaded", () => {
  const navWrapper = document.getElementById("main-nav");
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const cursor = document.querySelector(".cursor-glow");

  // 1. Zoptymalizowana obsługa przewijania
  const handleScroll = () => {
    const scrollValue = window.scrollY;

    // Dodawanie klasy z lekkim marginesem bezpieczeństwa
    if (scrollValue > 60) {
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
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Jeśli klikamy w już otwarte - po prostu zamknij
      if (isActive) {
        item.classList.remove("active");
        return;
      }

      // Zamykamy inne (płynnie dzięki CSS)
      faqItems.forEach((el) => el.classList.remove("active"));

      // Otwieramy obecne
      item.classList.add("active");

      // Płynny scroll bez skakania
      setTimeout(() => {
        const offset = 150; // dostosuj do wysokości swojego menu
        const elementPosition =
          item.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }, 100); // 100ms wystarczy, by animacje ruszyły bez szarpania
    });
  });
  // --- OBSŁUGA MENU MOBILNEGO ---
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (mobileToggle && navLinks) {
    // Kliknięcie w hamburger
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileToggle.classList.toggle("active");
      body.classList.toggle("menu-open");
    });

    // Zamknięcie menu po kliknięciu w link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileToggle.classList.remove("active");
        body.classList.remove("menu-open");
      });
    });
    // --- SCROLL SPY (Podświetlanie menu podczas przewijania) ---
    const sections = document.querySelectorAll("section[id]");

    function scrollActive() {
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150; // Margines dla nagłówka
        const sectionId = current.getAttribute("id");
        const menuLink = document.querySelector(
          `.nav-links a[href*=${sectionId}]`,
        );

        if (menuLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            menuLink.classList.add("active-link");
          } else {
            menuLink.classList.remove("active-link");
          }
        }
      });
    }

    window.addEventListener("scroll", scrollActive);
  }
});

function handleAction(type) {
  alert(`Wybrano: ${type}\nWkrótce uruchomimy system rezerwacji online.`);
}
