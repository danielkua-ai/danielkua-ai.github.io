document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const slider = document.querySelector('.hero-slider');
    let slideIndex = 0;
    let previousSlideIndex = 0;
    let isUserScrolling = false;
    let previousScrollLeft = 0;  // Initialize previousScrollLeft to track the previous scroll position

    function updateDots(index) {
        dots.forEach((dot, i) => {
            const fill = dot.querySelector('.fill');
            dot.classList.toggle('active', i === index);
            fill.style.width = i === index ? '100%' : '0';
        });
        slideIndex = index;  // Update the slideIndex here
    }

    function fillDots() {
        const scrollLeft = slider.scrollLeft;
        const slideWidth = slides[0].clientWidth + parseInt(window.getComputedStyle(slides[0]).marginRight);
        const progress = (scrollLeft % slideWidth) / slideWidth;
        const currentIndex = Math.floor(scrollLeft / slideWidth);
        const direction = scrollLeft > previousScrollLeft ? 'right' : 'left';  // Determine the scroll direction

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
        previousScrollLeft = scrollLeft;  // Update previousScrollLeft with the current scroll position
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
        previousScrollLeft = slides[index].offsetLeft;  // Update previousScrollLeft to match the new position
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
        slideIndex = index;  // Update slideIndex based on current scroll position
    });

    const observer = new IntersectionObserver((entries) => {
        if (isUserScrolling) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = [...slides].indexOf(entry.target);
                updateDots(index);
                slideIndex = index;
                previousSlideIndex = index;
                previousScrollLeft = slides[index].offsetLeft;  // Update previousScrollLeft to match the new position
            }
        });
    }, {
        root: slider,
        threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));
});
