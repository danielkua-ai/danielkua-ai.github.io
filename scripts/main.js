let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll('.hero-slider .slide');
    let dots = document.querySelectorAll('.slider-nav .dot');
    
    slides.forEach((slide, index) => {
        slide.style.opacity = '0';
        dots[index].classList.remove('active');
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.opacity = '1';
    dots[slideIndex - 1].classList.add('active');
    
    setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}
