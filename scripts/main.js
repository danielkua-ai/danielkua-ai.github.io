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

    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            currentSlide(slideIndex + 1);
        } else {
            currentSlide(slideIndex - 1);
        }
        startX = null;
    }
});

// Add hover effect for touch devices
document.querySelectorAll('.slide img').forEach(img => {
    img.addEventListener('touchstart', () => {
        img.classList.add('hover');
    });
    img.addEventListener('touchend', () => {
        img.classList.remove('hover');
    });
});
