const imgDFR = 380
const spinner = document.querySelector(".spinner");
const skillLogos = spinner.querySelectorAll('img');

function skillTransition() {
    var navUA = navigator.userAgent.toLowerCase(); 
    var checkSafari = false;
    try {
        checkSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    } catch(err) {}
    checkSafari = (checkSafari || ((navUA.indexOf('safari') != -1)&& (!(navUA.indexOf('chrome')!= -1) && (navUA.indexOf('version/')!= -1))));

    skillLogos.forEach((skills, index) => {
        skills.style.transition = "transform 1s, opacity 1s";
        skills.style.transform = `rotateY(${index * (360 / skillLogos.length)}deg) translateZ(${imgDFR}px)`;
        skills.style.opacity = "1";
        if (!checkSafari) {
            skills.classList.add('imgReflect');
        }
        skills.style.transitionDelay = ".500s";
    });
    initResponsive();
}

function initResponsive() {
    let maxScreenWidth = window.screen.width;
    let screenWidth = window.innerWidth;
    let translateZValue = Math.min(screenWidth / 3, imgDFR);
    let newSize;

    if (maxScreenWidth <= 1440) {
        translateZValue = Math.min(screenWidth / 2.5, 335);
    } else {
        translateZValue = Math.min(screenWidth / 3, imgDFR);
    }

    if (screenWidth <= 574) {
        newSize = Math.max(50, 100 - (574 - screenWidth) / 5.24);
    } else {
        newSize = 100;
    }

    spinner.style.width = newSize + "px";
    spinner.style.height = newSize + "px";

    skillLogos.forEach((skills, index) => {
        skills.style.transform = "rotateY(" + (index * (360 / skillLogos.length)) + "deg) translateZ(" + translateZValue + "px)";
    });
}

function responsive() {
    let maxScreenWidth = window.screen.width;
    let screenWidth = window.innerWidth;
    let translateZValue = Math.min(screenWidth / 3, imgDFR);
    let newSize;

    if (maxScreenWidth <= 1440) {
        translateZValue = Math.min(screenWidth / 2.5, 335);
    } else {
        translateZValue = Math.min(screenWidth / 3, imgDFR);
    }

    if (screenWidth <= 574) {
        newSize = Math.max(50, 100 - (574 - screenWidth) / 5.24);
    } else {
        newSize = 100;
    }

    spinner.style.width = newSize + "px";
    spinner.style.height = newSize + "px";

    if (skillLogos[0].style.transitionDelay != ".0s") {
        skillLogos.forEach((skills, index) => {
            skills.style.transform = "rotateY(" + (index * (360 / skillLogos.length)) + "deg) translateZ(" + translateZValue + "px)";
            skills.style.transitionDelay = ".0s";
        });
    } else {
        skillLogos.forEach((skills, index) => {
            skills.style.transform = "rotateY(" + (index * (360 / skillLogos.length)) + "deg) translateZ(" + translateZValue + "px)";
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.no-animation').forEach(element => {
                element.classList.remove('no-animation');
            });
            observer.unobserve(entry.target);
        }
    }, {
        rootMargin: '0px',
        threshold: 0.14
    });

    const section = document.querySelector('.timelineInit');
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function() {
    var testers = document.querySelectorAll('.skillName');

    testers.forEach(function(tester) {
        tester.addEventListener('mouseenter', function() {
            var matchingTesters = document.querySelectorAll('.skillName[data-name="' + tester.getAttribute('data-name') + '"]');
            matchingTesters.forEach(function(t) {
                t.classList.add('skillName-hovered');
            });
        });

        tester.addEventListener('mouseleave', function() {
            var matchingTesters = document.querySelectorAll('.skillName[data-name="' + tester.getAttribute('data-name') + '"]');
            matchingTesters.forEach(function(t) {
                t.classList.remove('skillName-hovered');
            });
        });
    });
});

window.addEventListener ? 
    window.addEventListener("load",skillTransition,false) 
    : 
    window.attachEvent && window.attachEvent("onload",skillTransition);

window.addEventListener('resize', responsive);
