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

// Swipe functionality
let startX, endX;

document.querySelector('.hero-slider').addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
});

document.querySelector('.hero-slider').addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        // Swipe left
        currentSlide(slideIndex + 1);
    } else if (startX < endX - 50) {
        // Swipe right
        currentSlide(slideIndex - 1);
    }
});
