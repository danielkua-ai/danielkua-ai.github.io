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
let startX;

document.getElementById('hero-slider').addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
});

document.getElementById('hero-slider').addEventListener('touchend', function(event) {
    let endX = event.changedTouches[0].clientX;
    if (startX > endX + 50) {
        showSlides(slideIndex += 1);
    } else if (startX < endX - 50) {
        showSlides(slideIndex -= 1);
    }
});
