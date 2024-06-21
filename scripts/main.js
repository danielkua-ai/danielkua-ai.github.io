document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let lastScrollLeft = 0;

    function updateDots() {
        const scrollLeft = slider.scrollLeft;
        const slideWidth = slides[0].clientWidth;
        const scrollIndex = Math.round(scrollLeft / slideWidth);
        const direction = scrollLeft > lastScrollLeft ? 'right' : 'left';

        dots.forEach((dot, index) => {
            const fill = dot.querySelector('.fill');
            if (index < scrollIndex) {
                fill.style.width = '100%';
            } else if (index === scrollIndex) {
                const progress = (scrollLeft % slideWidth) / slideWidth * 100;
                fill.style.width = `${progress}%`;
                fill.style.transformOrigin = direction === 'right' ? 'left' : 'right';
            } else {
                fill.style.width = '0%';
            }
        });

        lastScrollLeft = scrollLeft;
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
