document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav .dot');
    const fill = document.querySelector('.slider-nav .fill');

    function setActiveDot(index) {
        const activeDot = dots[index];
        const fillPosition = activeDot.offsetLeft + activeDot.offsetWidth / 2 - fill.offsetWidth / 2;
        fill.style.transform = `translateX(${fillPosition}px)`;
    }

    function scrollToSlide(index) {
        const slide = slides[index];
        slide.scrollIntoView({ behavior: 'smooth' });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSlide(index);
            setActiveDot(index);
        });
    });

    document.querySelector('.hero-slider').addEventListener('scroll', () => {
        let index = Math.round(document.querySelector('.hero-slider').scrollLeft / document.querySelector('.hero-slider').offsetWidth);
        setActiveDot(index);
    });

    // Initialize the first dot as active
    setActiveDot(0);
});
