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
const navbarElements = document.getElementsByTagName('section');

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

/*Add class 'active' to section when near top of viewport*/
/*Using IntersectionObserver*/

const callback = entries => {

    for(const i of entries){
        const navbarItem = document.querySelector(
            `.menu__link[data-link='${i.target.id}']`,
          )
          const section = document.getElementById(i.target.id)
      
          if (i && i.isIntersecting) {
            navbarItem.classList.add('your-active-class')
            section.classList.add('your-active-class')
          } else {
            if (navbarItem.classList.contains('your-active-class')) {
                navbarItem.classList.remove('your-active-class')
            }

            if (section.classList.contains('your-active-class')) {
              section.classList.remove('your-active-class')
            }
          }
    }
  }

//Observer Options
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  }

//Observer Configuration
  const navObserver = new IntersectionObserver(callback, options)
  for( let i of navbarElements){
    navObserver.observe(document.getElementById(i.id))
  }