"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const submitModel = document.querySelector(".btn-modal");
const tabs = document.querySelectorAll(".resources__tab");
const tabsContainer = document.querySelector(".resources__tab-container");
const tabsContent = document.querySelectorAll(".resources__content-container");
const btnOpenModal = document.getElementById("contact");
const btnCloseModal = document.querySelector(".btn--close-modal");

// Modal

const openModal = function (e) {
  // e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
submitModel.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// How Section

tabsContainer.addEventListener("mouseover", function (e) {
  const clicked = e.target.closest(".resources__tab");

  if (!clicked) return;

  // Active tab
  tabs.forEach((t) => t.classList.remove("resources__tab--active"));
  clicked.classList.add("resources__tab--active");
  tabsContent.forEach((c) =>
    c.classList.remove("resources__content-container--active")
  );

  // Activate content area

  document
    .querySelector(`.resources__content-container--${clicked.dataset.tab}`)
    .classList.add("resources__content-container--active");
});

/////////////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".btn--left");
  const btnRight = document.querySelector(".btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dot" data-slide="${i}">&nbsp;</button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dot) => dot.classList.remove("dot--fill"));

    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("dot--fill");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${110 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handler
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextSlide();
    }
    if (e.key === "ArrowLeft") {
      prevSlide();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

// Smooth Scrolling animation

const allLinks = document.querySelectorAll("a:link");

// allLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const href = link.getAttribute("href");
//     console.log(href);
//     // Scroll back to to
//     if (href === "#")
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });

//     // Scroll to other sections
//     if (href !== "#" && href.startsWith("#") && href.startsWith(!"#https")) {
//       const sectionEl = document.querySelector(href);
//       console.log(sectionEl);
//       sectionEl.scrollIntoView({ behavior: "smooth" });
//     }

//     if (href !== "#" && href.startsWith("#https")) {
//       return;
//     }
//   });
// });

// Can not work with link
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Reveal Section
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Mobile nav
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const mainLinks = document.querySelectorAll(".main-nav-link");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

mainLinks.forEach((link) =>
  link.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  })
);
