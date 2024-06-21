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

// Swiping functionality
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchMove(event) {
    touchEndX = event.changedTouches[0].screenX;
}

function handleTouchEnd() {
    if (touchEndX < touchStartX) {
        slideIndex++;
    } else if (touchEndX > touchStartX) {
        slideIndex--;
    }
    showSlides(slideIndex);
}

document.querySelector('.hero-slider').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.hero-slider').addEventListener('touchmove', handleTouchMove, false);
document.querySelector('.hero-slider').addEventListener('touchend', handleTouchEnd, false);
