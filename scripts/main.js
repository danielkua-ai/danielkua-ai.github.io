let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

showSlides(slideIndex);

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    slides[slideIndex].style.display = 'block';
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// Add smooth horizontal scroll event listener for navigation
let startX = 0;
let endX = 0;
window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
window.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) { // Adjust the value for better sensitivity
        currentSlide(slideIndex + 1);
    } else if (startX < endX - 50) {
        currentSlide(slideIndex - 1);
    }
});

// Enable scrolling with mouse wheel or trackpad
window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        currentSlide(slideIndex + 1);
    } else {
        currentSlide(slideIndex - 1);
    }
});
