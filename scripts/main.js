document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-nav .dot');

    let currentSlide = 0;

    // Function to update slide and dots
    const updateSlide = () => {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.display = 'block'; // Adjust as needed based on your slide structure
                dots[index].classList.add('active');
            } else {
                slide.style.display = 'none'; // Adjust as needed based on your slide structure
                dots[index].classList.remove('active');
            }
        });
    };

    // Initial call to set the first slide and dot as active
    updateSlide();

    // Event listeners for dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
            // Smooth scroll to the selected slide
            slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
        });
    });
});
