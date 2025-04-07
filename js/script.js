// set current year
const yearEl = document.querySelector('.year');
yearEl.textContent = new Date().getFullYear();

// mobile navigation
const btnNav = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector("header");

btnNav.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

// smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function (link) {
  // e means event in the following line
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');
    
    // scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // scroll to the other links
    if (href !== "#" && href.startsWith("#")){
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle('nav-open');
    }
  });
});

// sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    
    if(!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if(ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
  // in the viewport
  root: null,
  threshold: 0,
  rootMargin: "-80px",
  }
);
// observer ovserves the hero section
observer.observe(sectionHeroEl);

// fixing flexbox gap property missing in some safari versions
function checkFlexGap () {
  var flex = document.createElement('div');
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();