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
let startX;

document.querySelector('.hero-slider').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.hero-slider').addEventListener('touchmove', (e) => {
    if (!startX) return;
    let endX = e.touches[0].clientX;
    let diffX = startX - endX;

    if (Math.abs(diffX) > 50) { // Adjust the sensitivity
        if (diffX > 0) {
            // Swipe left
            currentSlide(slideIndex + 1);
        } else {
            // Swipe right
            currentSlide(slideIndex - 1);
        }
        startX = null; // Reset the start position
    }
});
