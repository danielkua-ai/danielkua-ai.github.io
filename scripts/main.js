let slideIndex = 0;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    slideIndex = (n + slides.length) % slides.length; // Ensure circular sliding
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

document.querySelector('.hero-slider').addEventListener('touchstart', handleTouchStart, false);
document.querySelector('.hero-slider').addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            showSlides(slideIndex + 1);
        } else {
            showSlides(slideIndex - 1);
        }
    }

    xDown = null;
    yDown = null;
}
