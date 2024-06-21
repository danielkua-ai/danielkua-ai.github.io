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

// Add touch event listeners for swipe
let startX, startY;

document.querySelector('.hero-slider').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.querySelector('.hero-slider').addEventListener('touchmove', e => {
    if (!startX || !startY) return;

    let diffX = e.touches[0].clientX - startX;
    let diffY = e.touches[0].clientY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 50) {
            currentSlide(slideIndex - 1);
        } else if (diffX < -50) {
            currentSlide(slideIndex + 1);
        }
        startX = null; // Reset startX after a swipe
        startY = null; // Reset startY after a swipe
    }
});

// Adjust scroll behavior
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        // Downscroll
        currentSlide(slideIndex + 1);
    } else {
        // Upscroll
        currentSlide(slideIndex - 1);
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});
