document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let isUserScrolling = false;
    let timeout;

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
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            isUserScrolling = true;
            scrollToSlide(index);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                isUserScrolling = false;
            }, 500); // Wait for the scrolling to finish
        });
    });

    slider.addEventListener('scroll', () => {
        if (isUserScrolling) return;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const scrollLeft = slider.scrollLeft;
            const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
            const index = Math.round(scrollLeft / slideWidth);
            updateDots(index);
        }, 100); // Adjust delay as needed
    });

    const observer = new IntersectionObserver((entries) => {
        if (isUserScrolling) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);
                updateDots(index);
            }
        });
    }, {
        root: null,
        threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));

    let xDown = null;
    let yDown = null;

    slider.addEventListener('touchstart', handleTouchStart, false);
    slider.addEventListener('touchmove', handleTouchMove, false);
    slider.addEventListener('touchend', handleTouchEnd, false);

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
                // Swiping left
                scrollToSlide([...slides].indexOf(document.elementFromPoint(xUp, yUp)) + 1);
            } else {
                // Swiping right
                scrollToSlide([...slides].indexOf(document.elementFromPoint(xUp, yUp)) - 1);
            }
        }

        xDown = null;
        yDown = null;
    }

    function handleTouchEnd() {
        setTimeout(() => {
            isUserScrolling = false;
        }, 500); // Wait for the scrolling to finish
    }
});


