document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let slideIndex = 0;
    let previousSlideIndex = 0;
    let isUserScrolling = false;
    let previousScrollLeft = slider.scrollLeft;

    function updateDots(index) {
        dots.forEach((dot, i) => {
            const fill = dot.querySelector('.fill');
            dot.classList.toggle('active', i === index);
            fill.style.width = i === index ? '100%' : '0';
        });
        slideIndex = index;
    }

    function fillDots() {
        const scrollLeft = slider.scrollLeft;
        const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
        const progress = (scrollLeft % slideWidth) / slideWidth;
        const currentIndex = Math.floor(scrollLeft / slideWidth);
        const direction = scrollLeft > previousScrollLeft ? 'right' : 'left';

        dots.forEach((dot, i) => {
            const fill = dot.querySelector('.fill');
            if (i < currentIndex) {
                fill.style.width = '100%';
            } else if (i === currentIndex) {
                if (direction === 'right') {
                    fill.style.width = `${progress * 100}%`;
                } else {
                    fill.style.width = `${(1 - progress) * 100}%`;
                }
            } else {
                fill.style.width = '0';
            }
        });

        previousSlideIndex = currentIndex;
        previousScrollLeft = scrollLeft;
    }

    function scrollToSlide(index) {
        if (index < 0 || index >= slides.length) return;
        isUserScrolling = true;
        slider.scrollTo({
            left: slides[index].offsetLeft,
            behavior: 'smooth'
        });
        updateDots(index);
        slideIndex = index;
        previousSlideIndex = index;
        previousScrollLeft = slides[index].offsetLeft;
        setTimeout(() => {
            isUserScrolling = false;
        }, 500);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSlide(index);
        });
    });

    slider.addEventListener('scroll', () => {
        if (isUserScrolling) return;

        fillDots();

        const scrollLeft = slider.scrollLeft;
        const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
        const index = Math.round(scrollLeft / slideWidth);
        updateDots(index);
        slideIndex = index;
    });

    const observer = new IntersectionObserver((entries) => {
        if (isUserScrolling) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);
                updateDots(index);
                slideIndex = index;
                previousSlideIndex = index;
                previousScrollLeft = slides[index].offsetLeft;
            }
        });
    }, {
        root: slider,
        threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));
});
