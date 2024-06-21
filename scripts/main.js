document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let currentSlideIndex = 0;
    let lastScrollLeft = 0;

    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentSlideIndex = index;
    }

    function scrollToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        slider.scrollTo({
            left: slides[index].offsetLeft,
            behavior: 'smooth'
        });
        updateDots(index);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSlide(index);
        });
    });

    let isScrolling;
    slider.addEventListener('scroll', () => {
        if (isScrolling) return;

        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollLeft = slider.scrollLeft;
            const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
            const newIndex = Math.round(scrollLeft / slideWidth);
            if (newIndex !== currentSlideIndex) {
                updateDots(newIndex);
            }
            lastScrollLeft = scrollLeft;
        }, 100);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);
                updateDots(index);
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
                scrollToSlide(currentSlideIndex + 1);
            } else {
                scrollToSlide(currentSlideIndex - 1);
            }
        }

        xDown = null;
        yDown = null;
    }
});
