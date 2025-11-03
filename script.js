'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const body = document.body;
const desktopMedia = window.matchMedia("(min-width: 992px)");

const setNavbarState = function (isOpen) {
  navbar.classList.toggle("active", isOpen);
  overlay.classList.toggle("active", isOpen);
  body.classList.toggle("nav-open", isOpen);
  const shouldHide = !(isOpen || desktopMedia.matches);
  navbar?.setAttribute("aria-hidden", String(shouldHide));

  navTogglers.forEach((toggler) =>
    toggler.setAttribute("aria-expanded", String(isOpen))
  );
};

const toggleNavbar = function () {
  const isOpen = !navbar.classList.contains("active");
  setNavbarState(isOpen);
};

addEventOnElem(navTogglers, "click", toggleNavbar);



/**
 * close navbar when click on any navbar links
 */

const navLinks = document.querySelectorAll("[data-nav-link]");

const closeNavbar = function () { setNavbarState(false); }

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down
 */

const header = document.querySelector("[data-header]");

const headerActive = function () {
  window.scrollY > 100 ? header.classList.add("active")
    : header.classList.remove("active");
}

addEventOnElem(window, "scroll", headerActive);



/**
 * highlight active navigation link
 */

const highlightNavLink = function (targetId) {
  if (!targetId) return;

  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href")?.split("#")[1];

    if (linkTarget === targetId) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    }
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const linkTarget = link.getAttribute("href")?.split("#")[1];
    highlightNavLink(linkTarget);
  });
});

const observeSectionsForNav = function () {
  const sections = document.querySelectorAll("[data-section]");

  if (!("IntersectionObserver" in window) || sections.length === 0) {
    highlightNavLink(sections[0]?.id ?? "home");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          highlightNavLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    if (section.id) observer.observe(section);
  });
};

setNavbarState(false);

const initialHash = window.location.hash?.split("#")[1];
highlightNavLink(initialHash || "home");
observeSectionsForNav();

const handleDesktopChange = function () {
  setNavbarState(false);
};

if (typeof desktopMedia.addEventListener === "function") {
  desktopMedia.addEventListener("change", handleDesktopChange);
} else if (typeof desktopMedia.addListener === "function") {
  desktopMedia.addListener(handleDesktopChange);
}



/**
 * service cards reveal animation
 */

const initServiceCardObserver = function () {
  const cards = document.querySelectorAll("[data-service-card]");
  if (cards.length === 0) return;

  const setStagger = (card, index) => {
    card.style.setProperty("--stagger", index);
  };

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card, index) => {
      setStagger(card, index);
      card.classList.add("is-revealed");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.2,
    }
  );

  cards.forEach((card, index) => {
    setStagger(card, index);
    observer.observe(card);
  });
};

initServiceCardObserver();


/**
 * accordion toggle
 */

const accordionAction = document.querySelectorAll("[data-accordion-action]");

const toggleAccordion = function () { this.classList.toggle("active"); }

addEventOnElem(accordionAction, "click", toggleAccordion);