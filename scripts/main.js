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

// Add hover effect to the images
document.querySelectorAll('.slide img').forEach(img => {
    img.addEventListener('mouseenter', () => img.classList.add('hover'));
    img.addEventListener('mouseleave', () => img.classList.remove('hover'));
});

// Swipe functionality
let startX = 0;
let endX = 0;

document.querySelector('.hero-slider').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.hero-slider').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) currentSlide(slideIndex + 2); // Swipe left
    if (startX < endX - 50) currentSlide(slideIndex); // Swipe right
});
