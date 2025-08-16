// =======================
// Mobile Menu Toggle
// =======================
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector("nav ul");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

// =======================
// Smooth Scrolling (Works from any page)
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll('a[href^="/#"], a[href^="#"]');

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const targetId = href.split("#")[1];
      const isHomePage = window.location.pathname === "/";

      if (window.location.hash === href || (isHomePage && targetId)) {
        e.preventDefault();
        navMenu.classList.remove("show");
        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 90,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Smooth scroll if page loads with a hash
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop - 90,
          behavior: "smooth",
        });
      }, 300);
    }
  }
});

// =======================
// Animation on Scroll
// =======================
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `fadeInUp 1s ease forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll("section, .card").forEach((element) => {
  element.style.opacity = "0";
  observer.observe(element);
});

// =======================
// Gallery Lightbox (NO fire particles in fullscreen)
// =======================
const galleryImages = document.querySelectorAll(".gallery-item img");
let currentIndex = 0;

const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.innerHTML = `
  <span class="close">&times;</span>
  <span class="arrow left">&#10094;</span>
  <img src="" alt="Full Image">
  <span class="arrow right">&#10095;</span>
`;
// No particles added here to keep fullscreen clean
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");

function showImage(index) {
  currentIndex = index;
  const fullSrc = galleryImages[index].dataset.full || galleryImages[index].src;

  lightboxImg.style.opacity = "0";
  setTimeout(() => {
    lightboxImg.src = fullSrc;
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = "1";
    };
  }, 200);

  if (!lightbox.classList.contains("show")) {
    lightbox.classList.add("show");
  }
}

galleryImages.forEach((img, i) => {
  img.addEventListener("click", () => showImage(i));
});

lightbox.querySelector(".close").addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.querySelector(".arrow.left").addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

lightbox.querySelector(".arrow.right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});
