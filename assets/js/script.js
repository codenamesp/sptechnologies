'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });





// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// // navigation variables
// const navigationLinks = document.querySelectorAll("[data-nav-link]");
// const pages = document.querySelectorAll("[data-page]");

// // page navigation
// navigationLinks.forEach(link => {
//   link.addEventListener("click", function () {

//     const targetPage = this.innerHTML.toLowerCase();

//     // remove active from everything
//     pages.forEach(page => page.classList.remove("active"));
//     navigationLinks.forEach(nav => nav.classList.remove("active"));

//     // activate selected page
//     for (const page of pages) {
//       if (page.dataset.page === targetPage) {
//         page.classList.add("active");
//         this.classList.add("active");
//         window.scrollTo(0, 0);
//         break;
//       }
//     }

//   });
// });

// navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Also select body once
const body = document.body;

// page navigation
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    // remove active from everything
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(nav => nav.classList.remove("active"));

    // remove all page- classes from body first
    body.classList.remove("page-home", "page-about", "page-portfolio", "page-blog");

    // activate selected page
    for (const page of pages) {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        this.classList.add("active");

        // Add page-specific class to body
        body.classList.add(`page-${targetPage}`);

        window.scrollTo(0, 0);
        break;
      }
    }
  });
});

// IMPORTANT: Also set correct class when page first loads (usually Home)
document.addEventListener("DOMContentLoaded", () => {
  const activePage = document.querySelector("[data-page].active");
  if (activePage) {
    const pageName = activePage.dataset.page;
    body.classList.add(`page-${pageName}`);
  } else {
    // fallback — assume home if nothing is active
    body.classList.add("page-home");
  }
});