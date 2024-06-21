document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let slideIndex = 0;

    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function scrollToSlide(index) {
        slider.scrollTo({
            left: slides[index].offsetLeft - slider.offsetLeft + slider.scrollLeft,
            behavior: 'smooth'
        });
        updateDots(index);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            scrollToSlide(index);
        });
    });

    slider.addEventListener('scroll', () => {
        clearTimeout(slider.scrollTimeout);
        slider.scrollTimeout = setTimeout(() => {
            const slideWidth = slides[0].clientWidth + parseInt(getComputedStyle(slides[0]).marginRight, 10);
            slideIndex = Math.round(slider.scrollLeft / slideWidth);
            updateDots(slideIndex);
        }, 100);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slideIndex = [...slides].indexOf(entry.target);
                updateDots(slideIndex);
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
    }
});
