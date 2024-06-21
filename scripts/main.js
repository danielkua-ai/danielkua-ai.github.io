let slideIndex = 0;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n - 1);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.dot');
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.style.transform = `translateX(-${slideIndex * 100}%)`);
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// Add swipe functionality
let startX;
let startY;

document.querySelector('.hero-slider').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, false);

document.querySelector('.hero-slider').addEventListener('touchmove', (e) => {
    if (!startX || !startY) return;

    let endX = e.touches[0].clientX;
    let endY = e.touches[0].clientY;

    let diffX = startX - endX;
    let diffY = startY - endY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            showSlides(slideIndex += 1);
        } else {
            showSlides(slideIndex -= 1);
        }
    }

    startX = null;
    startY = null;
}, false);
