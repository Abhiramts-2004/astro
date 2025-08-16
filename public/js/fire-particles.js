function initFireParticles() {
  createFireParticles(".card", 5); // For chapter cards
  createFireParticles(".gallery-item", 5); // For gallery items
}

function createFireParticles(selector, count) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    // Check if particles already exist
    if (element.querySelector(".fire-particle-container")) return;

    const particleContainer = document.createElement("div");
    particleContainer.className = "fire-particle-container";
    element.appendChild(particleContainer);

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "fire-particle";
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particle.style.left = `${Math.random() * 100}%`;
      particleContainer.appendChild(particle);
    }

    element.addEventListener("mouseenter", () => {
      particleContainer.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      particleContainer.style.opacity = "0";
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initFireParticles);
