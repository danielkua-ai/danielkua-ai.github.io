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
    slides.forEach(slide => slide.style.transform = `translateX(-${slideIndex * (100 + 2)}%)`); // Adjust for margin
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// Enable swipe functionality
let startX, endX;

document.querySelector('.hero-slider').addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
});

document.querySelector('.hero-slider').addEventListener('touchmove', function(event) {
    endX = event.touches[0].clientX;
});

document.querySelector('.hero-slider').addEventListener('touchend', function() {
    if (startX > endX + 50) {
        currentSlide(slideIndex + 2); // Swipe left
    } else if (startX < endX - 50) {
        currentSlide(slideIndex); // Swipe right
    }
});
