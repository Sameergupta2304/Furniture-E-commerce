const navbar = document.getElementById("navbar");
const nav_2 = document.getElementById("hamburger");

let lastScroll = window.scrollY;
const limit = window.innerHeight; 

window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current > 200 && current < 600 ) {
        navbar.classList.add("active");
        nav_2.classList.add("active");
    } else {
        navbar.classList.remove("active");
        nav_2.classList.remove("active");
    }

    const withinLimit = current >= limit;

    if ( withinLimit) {
        navbar.classList.add("fixed");
        nav_2.classList.add("fixed");
    } else {
        navbar.classList.remove("fixed");
        nav_2.classList.remove("fixed");
    }

    // lastScroll = current;
});

// let main_2_img = document.getElementById("img-main-2")
const elements ={
    main_2_img : document.getElementById("img-main-2"),
    main_3_div : document.getElementById("main-3-div"),
    main_5_div : document.getElementById("main-5-div"),
    main_6_h1 : document.getElementById("main-6-h1"),

}
const observer = new IntersectionObserver (enteries =>{
    enteries.forEach(entry =>{
        entry.target.classList.toggle("animateFromBottom",entry.isIntersecting)
    })
    // console.log(enteries)

},{
    threshold:0.2
})
Object.values(elements).forEach(value =>{
     if (value instanceof Element) {
        observer.observe(value);
    }
})



const elements2 ={
    text_main_2_span : document.querySelector("#text-main-2 span"),
    main_4_txt_2 : document.querySelector("#main-4-txt-2")



}
const observer2 = new IntersectionObserver (enteries =>{
    enteries.forEach(entry =>{
        entry.target.classList.toggle("animateFromLeft",entry.isIntersecting)
    })
    // console.log(enteries)

},{
    threshold:0.2
})
Object.values(elements2).forEach(value =>{
     if (value instanceof Element) {
        observer2.observe(value);
    }
})
// slider 

const track = document.querySelector(".slider-track");
const slides = Array.from(track.children);

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let visibleSlides = window.innerWidth <= 768 ? 1 : 3;
window.addEventListener("resize", () => {
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
});
let index = visibleSlides;


let slideWidth = slides[0].offsetWidth;

// ===== CLONE FIRST & LAST =====
const firstClones = slides.slice(0, visibleSlides).map(s => s.cloneNode(true));
const lastClones = slides.slice(-visibleSlides).map(s => s.cloneNode(true));

lastClones.forEach(clone => track.prepend(clone));
firstClones.forEach(clone => track.appendChild(clone))
const allSlides = document.querySelectorAll(".slide");

// start position
track.style.transform = `translateX(-${index * slideWidth}px)`;

// ===== MOVE FUNCTION =====
function updateCenter() {
    document.querySelectorAll(".slide").forEach(s =>
        s.classList.remove("active-center")
    );

    const centerIndex = index + Math.floor(visibleSlides / 2);
    const slides = document.querySelectorAll(".slide");

    if (slides[centerIndex]) {
        slides[centerIndex].classList.add("active-center");
    }
}
function move() {
    track.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    updateCenter();
}

// ===== NEXT =====
nextBtn.addEventListener("click", () => {
    index++;
    move();
});

// ===== PREV =====
prevBtn.addEventListener("click", () => {
    index--;
    move();
});

// ===== RESET WHEN REACH END =====
track.addEventListener("transitionend", () => {
    if (index >= slides.length + visibleSlides) {
        track.style.transition = "none";
        index = visibleSlides;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    if (index <= 0) {
        track.style.transition = "none";
        index = slides.length;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }
});

// ===== AUTO SLIDE =====
let auto = setInterval(() => {
    index++;
    move();
}, 7000);

track.addEventListener("mouseenter", () => clearInterval(auto));
track.addEventListener("mouseleave", () => {
    auto = setInterval(() => {
        index++;
        move();
    }, 7000);
});

// ===== DRAG =====
let startX = 0;
let isDragging = false;

track.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.pageX;
});

track.addEventListener("mouseup", e => {
    if (!isDragging) return;
    isDragging = false;

    const diff = e.pageX - startX;

    if (diff > 50) index--;
    if (diff < -50) index++;

    move();
});



const hamburger = document.getElementById("hamburger");
const navUl = document.querySelector("#nav-div ul");

hamburger.addEventListener("click", () => {
    navUl.classList.toggle("active");
});

