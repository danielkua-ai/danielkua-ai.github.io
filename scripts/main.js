let slideIndex = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const observerOptions = {
        root: document.querySelector('.hero-slider'),
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slideIndex = [...slides].indexOf(entry.target);
                updateDots(slideIndex);
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });

    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    document.querySelector('.hero-slider').addEventListener('scroll', debounce(handleScroll, 200));

    function handleScroll() {
        const slider = document.querySelector('.hero-slider');
        const slideWidth = slider.offsetWidth;
        const scrollLeft = slider.scrollLeft;
        const newIndex = Math.round(scrollLeft / slideWidth);
        if (newIndex !== slideIndex) {
            slideIndex = newIndex;
            updateDots(slideIndex);
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        slideIndex = (n + slides.length) % slides.length; // Ensure circular sliding
        const container = document.querySelector('.hero-slider');
        container.scrollTo({
            left: slides[slideIndex].offsetLeft,
            behavior: 'smooth'
        });
        updateDots(slideIndex);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });

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
});
