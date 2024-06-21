document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let lastScrollLeft = 0;

    function updateDots() {
        const scrollLeft = slider.scrollLeft;
        const scrollWidth = slider.scrollWidth - slider.clientWidth;
        const relativeScroll = scrollLeft / scrollWidth;

        const activeIndex = Math.round(relativeScroll * (dots.length - 1));
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    function scrollToSlide(index) {
        const slideWidth = slides[0].clientWidth;
        slider.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });
        updateDots();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSlide(index);
        });
    });

    slider.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateDots);
    });

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
                scrollToSlide(Math.min(slides.length - 1, Math.round(slider.scrollLeft / slides[0].clientWidth) + 1));
            } else {
                scrollToSlide(Math.max(0, Math.round(slider.scrollLeft / slides[0].clientWidth) - 1));
            }
        }

        xDown = null;
        yDown = null;
    }
});
