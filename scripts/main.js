document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let slideIndex = 0;
    let lastScrollLeft = 0;

    function updateDots(index, direction) {
        dots.forEach((dot, i) => {
            const fill = dot.querySelector('.fill');
            if (direction === 'right') {
                fill.style.width = i <= index ? '100%' : '0';
            } else {
                fill.style.width = i >= index ? '100%' : '0';
            }
        });
        slideIndex = index;
    }

    function scrollToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        slider.scrollTo({
            left: slides[index].offsetLeft,
            behavior: 'smooth'
        });
        updateDots(index, 'right');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            scrollToSlide(index);
        });
    });

    let isScrolling;
    slider.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollLeft = slider.scrollLeft;
            const slideWidth = slides[0].clientWidth;
            const index = Math.round(scrollLeft / slideWidth);
            const direction = scrollLeft > lastScrollLeft ? 'right' : 'left';
            lastScrollLeft = scrollLeft;
            updateDots(index, direction);
        }, 100);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);
                const direction = entry.boundingClientRect.left < entry.rootBounds.left ? 'right' : 'left';
                updateDots(index, direction);
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
