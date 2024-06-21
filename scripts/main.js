document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let slideIndex = 0;
    let isScrolling = false;

    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function scrollToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        slider.scrollTo({
            left: slides[index].offsetLeft,
            behavior: 'smooth'
        });
        updateDots(index);
        slideIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            isScrolling = true;
            scrollToSlide(index);
            setTimeout(() => {
                isScrolling = false;
            }, 500); // Wait for the scrolling to finish
        });
    });

    const observer = new IntersectionObserver((entries) => {
        if (isScrolling) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);
                updateDots(index);
                slideIndex = index;
            }
        });
    }, {
        root: slider,
        threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));

    let xDown = null;
    let yDown = null;

    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchmove', handleTouchMove, false);

    function getTouches(evt) {
        return evt.touches || evt.originalEvent.touches;
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
        isScrolling = true;
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
                scrollToSlide(slideIndex + 1);
            } else {
                scrollToSlide(slideIndex - 1);
            }
        }

        xDown = null;
        yDown = null;
        setTimeout(() => {
            isScrolling = false;
        }, 500); // Wait for the scrolling to finish
    }
});
