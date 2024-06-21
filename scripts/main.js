document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav .dot');
    const fill = document.querySelector('.slider-nav .fill');
    let lastScrollLeft = 0;

    function setActiveDot(index, direction) {
        const activeDot = dots[index];
        const fillPosition = activeDot.offsetLeft + activeDot.offsetWidth / 2 - fill.offsetWidth / 2;
        
        if (direction === 'right') {
            fill.style.transform = `translateX(${fillPosition + activeDot.offsetWidth}px)`;
            requestAnimationFrame(() => {
                fill.style.transition = 'transform 0.3s ease';
                fill.style.transform = `translateX(${fillPosition}px)`;
            });
        } else {
            fill.style.transform = `translateX(${fillPosition - activeDot.offsetWidth}px)`;
            requestAnimationFrame(() => {
                fill.style.transition = 'transform 0.3s ease';
                fill.style.transform = `translateX(${fillPosition}px)`;
            });
        }
    }

    function scrollToSlide(index) {
        const slide = slides[index];
        slide.scrollIntoView({ behavior: 'smooth' });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const direction = index > getCurrentSlideIndex() ? 'right' : 'left';
            scrollToSlide(index);
            setActiveDot(index, direction);
        });
    });

    document.querySelector('.hero-slider').addEventListener('scroll', () => {
        const slider = document.querySelector('.hero-slider');
        let index = Math.round(slider.scrollLeft / slider.offsetWidth);
        const direction = slider.scrollLeft > lastScrollLeft ? 'right' : 'left';
        lastScrollLeft = slider.scrollLeft;
        setActiveDot(index, direction);
    });

    function getCurrentSlideIndex() {
        return Math.round(document.querySelector('.hero-slider').scrollLeft / document.querySelector('.hero-slider').offsetWidth);
    }

    // Initialize the first dot as active
    setActiveDot(0, 'right');
});
