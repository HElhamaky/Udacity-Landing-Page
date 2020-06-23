/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/



 /*Define Global Variables*/
const navbarList = document.querySelector('#navbar__list');
const navbarElements = document.querySelectorAll('section')



/* Build the nav*/
for(let i of navbarElements){
    const navbarItem = `<li class='menu__link ${i.className}' data-link=${i.id}><a href="#${i.id}">${i.dataset.nav}</li>`
    navbarList.insertAdjacentHTML('beforeend', navbarItem);
}

/*Scroll to anchor ID on click using scrollIntoView event*/
navbarList.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.hasAttribute('data-link')) {
        var parent = e.target
    } else {
        var parent = e.target.parentElement
    }
    const sectionToScrollTo = document.getElementById(parent.dataset.link)
    sectionToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth', inline: "nearest"});
  })




// check which element is active
function getActiveElem() {
    maxSection = navbarElements[0];
    minVal = 1000000;
    for (item of navbarElements) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};


// Add class 'active' to section when near top of viewport
(function(){
    window.addEventListener('scroll', function (event) {
        let section = getActiveElem();
        const active = document.querySelector('li[data-link="' + section.id + '"]');
        active.classList.add('active__link');
        const headers = document.querySelectorAll('li');
        for (let item of headers) {
            if (item.dataset.link !== active.dataset.link && item.classList.contains('active__link')) {
                item.classList.remove('active__link');
            }
        };
    });
})();
