function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburger = document.querySelector(".hamburger");
  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Close mobile menu when clicking on a link or outside the menu
document.addEventListener("click", function (event) {
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  if (mobileMenu.classList.contains("active")) {
    const isClickInside = mobileMenu.contains(event.target);
    const isHamburger = hamburger.contains(event.target);

    if (!isClickInside && !isHamburger) {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    // 768px is the md breakpoint in Tailwind
    const mobileMenu = document.querySelector(".mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Scroll Progress
window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  document.querySelector(".scroll-progress").style.width = scrolled + "%";
});

// Section Visibility Animation
const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      updateActiveSection(entry.target.id);
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Active Section Tracking
function updateActiveSection(sectionId) {
  // Update navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === sectionId) {
      link.classList.add("active");
    }
  });

  // Update indicator dots
  document.querySelectorAll(".indicator-dot").forEach((dot) => {
    dot.classList.remove("active");
    if (dot.dataset.section === sectionId) {
      dot.classList.add("active");
    }
  });
}

// Smooth Scroll with Animation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Initialize Section Indicator Clicks
document.querySelectorAll(".indicator-dot").forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetSection = document.getElementById(dot.dataset.section);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Add scroll-triggered animations to elements
function addAnimations() {
  const elements = document.querySelectorAll(".section-animate");
  elements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Initialize animations
document.addEventListener("DOMContentLoaded", addAnimations);
