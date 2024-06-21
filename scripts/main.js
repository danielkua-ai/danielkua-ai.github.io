document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let slideIndex = 0;
    let isUserScrolling = false;
    let isScrolling;

    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
            if (i === index) {
                dot.querySelector('::before').style.width = '100%';
            } else {
                dot.querySelector('::before').style.width = '0';
            }
        });
    }

    function fillDots() {
        const scrollLeft = slider.scrollLeft;
        const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
        const progress = (scrollLeft % slideWidth) / slideWidth;
        dots.forEach((dot, i) => {
            if (i < Math.floor(scrollLeft / slideWidth)) {
                dot.querySelector('::before').style.width = '100%';
            } else if (i === Math.floor(scrollLeft / slideWidth)) {
                dot.querySelector('::before').style.width = `${progress * 100}%`;
            } else {
                dot.querySelector('::before').style.width = '0';
            }
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
            isUserScrolling = true;
            scrollToSlide(index);
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                isUserScrolling = false;
            }, 500);
        });
    });

    slider.addEventListener('scroll', () => {
        if (isUserScrolling) return;

        fillDots();

        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollLeft = slider.scrollLeft;
            const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
            const index = Math.round(scrollLeft / slideWidth);
            updateDots(index);
            slideIndex = index;
        }, 100);
    });

    const observer = new IntersectionObserver((entries) => {
        if (isUserScrolling) return;
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
        isUserScrolling = true;
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
            isUserScrolling = false;
        }, 500);
    }
});
