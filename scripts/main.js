document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let slideIndex = 0;
    let isUserScrolling = false;
    let previousScrollLeft = 0;

    function updateDots(index) {
        dots.forEach((dot, i) => {
            const fill = dot.querySelector('.fill');
            dot.classList.toggle('active', i === index);
            fill.style.width = i === index ? '100%' : '0';
        });
    }

    function fillDots() {
        const scrollLeft = slider.scrollLeft;
        const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
        const progress = (scrollLeft % slideWidth) / slideWidth;
        const direction = scrollLeft > previousScrollLeft ? 'right' : 'left';
        previousScrollLeft = scrollLeft;

        dots.forEach((dot, i) => {
            const fill = dot.querySelector('.fill');
            if (i < Math.floor(scrollLeft / slideWidth)) {
                fill.style.width = '100%';
            } else if (i === Math.floor(scrollLeft / slideWidth)) {
                fill.style.width = `${progress * 100}%`;
            } else {
                fill.style.width = '0';
            }
        });

        if (direction === 'left') {
            const progressIndex = Math.floor(scrollLeft / slideWidth);
            const progressDot = dots[progressIndex].querySelector('.fill');
            progressDot.style.width = `${(1 - progress) * 100}%`;
        }
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
            }
        });
    }, {
        root: slider,
        threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));
});
