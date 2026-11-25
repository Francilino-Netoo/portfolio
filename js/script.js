(() => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const backdrop = document.getElementById("nav-backdrop");
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];

  const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    if (backdrop) backdrop.hidden = true;
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    if (backdrop) backdrop.hidden = false;
    document.body.style.overflow = "hidden";
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
  }

  if (backdrop) backdrop.addEventListener("click", closeMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });

  const sections = Array.from(document.querySelectorAll("section[id]"));

  const setActiveLink = () => {
    const y = window.scrollY + 140;
    let current = sections[0]?.id;

    sections.forEach((section) => {
      if (y >= section.offsetTop) current = section.id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${current}`);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !message) {
        alert("Preencha nome e mensagem.");
        return;
      }

      const text = `Olá, meu nome é ${name}.\nMensagem: ${message}`;
      const url = `https://api.whatsapp.com/send?phone=5588996015972&text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  const projectImages = {
    projeto1: Array.from({ length: 12 }, (_, i) => `images/projeto1/${i + 1}.png`),
    projeto2: Array.from({ length: 5 }, (_, i) => `images/projeto2/${i}.png`),
  };

  document.querySelectorAll(".project-carousel").forEach((image) => {
    const images = projectImages[image.dataset.project];
    if (!images?.length) return;
    let current = 0;

    setInterval(() => {
      current = (current + 1) % images.length;
      image.style.opacity = "0";
      setTimeout(() => {
        image.src = images[current];
        image.style.opacity = "1";
      }, 220);
    }, 3500);
  });

  const galleryModal = document.getElementById("galleryModal");
  const galleryImage = document.getElementById("galleryImage");
  const galleryTitle = document.getElementById("galleryTitle");
  const galleryCounter = document.getElementById("galleryCounter");
  let galleryImages = [];
  let galleryIndex = 0;

  const renderGallery = () => {
    galleryImage.src = galleryImages[galleryIndex];
    galleryCounter.textContent = `${galleryIndex + 1} de ${galleryImages.length}`;
  };

  const closeGallery = () => {
    galleryModal.hidden = true;
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openGallery = (project) => {
    galleryImages = projectImages[project] || [];
    if (!galleryImages.length) return;
    galleryIndex = 0;
    galleryTitle.textContent =
      project === "projeto1" ? "Automa Web Negócios" : "Automa Web IA";
    renderGallery();
    galleryModal.hidden = false;
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  document.querySelectorAll("[data-gallery]").forEach((button) => {
    button.addEventListener("click", () => openGallery(button.dataset.gallery));
  });

  document.querySelector(".gallery-close")?.addEventListener("click", closeGallery);
  document.querySelector(".gallery-prev")?.addEventListener("click", () => {
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    renderGallery();
  });
  document.querySelector(".gallery-next")?.addEventListener("click", () => {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    renderGallery();
  });

  galleryModal?.addEventListener("click", (event) => {
    if (event.target === galleryModal) closeGallery();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && galleryModal?.getAttribute("aria-hidden") === "false") {
      closeGallery();
    }
  });
})();
