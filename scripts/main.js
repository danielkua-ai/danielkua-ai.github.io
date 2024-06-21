document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let currentSlideIndex = 0;

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
        currentSlideIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToSlide(index));
    });

    let isScrolling;
    slider.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollLeft = slider.scrollLeft;
            const slideWidth = slides[0].clientWidth;
            const index = Math.round(scrollLeft / slideWidth);
            updateDots(index);
            currentSlideIndex = index;
        }, 100);

        // Real-time dot updating
        const scrollLeft = slider.scrollLeft;
        const totalScrollWidth = slider.scrollWidth - slider.clientWidth;
        const relativeScroll = scrollLeft / totalScrollWidth;
        const dotIndex = Math.round(relativeScroll * (dots.length - 1));
        updateDots(dotIndex);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);
                updateDots(index);
                currentSlideIndex = index;
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
                // Scrolled left
                scrollToSlide(currentSlideIndex + 1);
            } else {
                // Scrolled right
                scrollToSlide(currentSlideIndex - 1);
            }
        }

        xDown = null;
        yDown = null;
    }
});
