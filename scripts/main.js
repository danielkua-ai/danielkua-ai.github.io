let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        currentIndex = index;
    });
});

// Remove automatic slide change
// function autoSlide() {
//     currentIndex = (currentIndex + 1) % slides.length;
//     showSlide(currentIndex);
// }

// setInterval(autoSlide, 5000);
