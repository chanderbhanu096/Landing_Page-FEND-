// --------- Adds <li> items to the DOM ----------
let containerCount = document.getElementsByClassName("landing__container")
    .length;

const myList = document.getElementById('myList');
// new list item

let newListItem = document.createElement('li');
newListItem.innerHTML = `<a href="#section1">Section 1</a>
<a href="#section2">Section 2</a>
<a href="#section3">Section 3</a>
<a href="#section4">Section 4</a>`;

myList.appendChild(newListItem);




// ------------responsive Navigation on smaller screens -----------

const navbarSwitch = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('#myList');
const navbarLinks = document.querySelectorAll('.navbar__menu a');

navbarSwitch.addEventListener("click", navbarSwitchClick);

function navbarSwitchClick() {
    navbarSwitch.classList.toggle("open-navbar-toggler");
    navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

function navbarLinkClick() {
    smoothScroll(event); //calls smooth scroll function found on line 41 when nav item is clicked
    if (navbarMenu.classList.contains("open")) { // closed navbar on smaller screens
        navbarSwitch.click();
    }
}

// script to create smooth scrolling for navigation

// *********** window.scrollInToView()**************
smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href") === "#" ? "body" : event.currentTarget.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

//Checks if section is in view and adds active-class with moving background and color change
function checkIfSectionInView() {
    let isInViewport = function(elem) {
        let bounding = elem.getBoundingClientRect();
        return (
            bounding.top <= 50 &&
            bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    for (i = 1; i < containerCount + 1; i++) {
        let sectionInFullView = document.getElementById("section" + i);

        window.addEventListener(
            "scroll",
            function(event) {
                if (isInViewport(sectionInFullView)) {
                    sectionInFullView.classList.add("your-active-class");
                } else {
                    sectionInFullView.classList.remove("your-active-class");
                }
            },
            false
        );
    }
}



/// script for active navigation style scroll

window.addEventListener('scroll', event => {
    let nav = document.querySelector('.navbar__menu');

    (window.scrollY >= 1) ? nav.classList.add('scroll'): nav.classList.remove('scroll');
});


window.addEventListener('scroll', event => {
    let navLinks = document.querySelectorAll('nav ul li a');
    let fromTop = window.scrollY;

    navLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('current');
        } else {
            link.classList.remove('current');
        }
    });
    checkIfSectionInView();
});