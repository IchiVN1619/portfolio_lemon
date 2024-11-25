let currentIndex = 0;
let autoSlideInterval;
const slideIntervalTime = 2000;

function showSlide(index) {
	const slides = document.querySelectorAll(".carousel-item");
	const indicatorsContainer = document.getElementById("carousel-indicators");

	if (index >= slides.length) {
		currentIndex = 0;
	} else if (index < 0) {
		currentIndex = slides.length - 1;
	} else {
		currentIndex = index;
	}

	const offset = -currentIndex * 100;
	document.querySelector(
		".carousel-inner"
	).style.transform = `translateX(${offset}%)`;

	const indicators = indicatorsContainer.querySelectorAll(".indicator");
	indicators.forEach((indicator, i) => {
		indicator.classList.toggle("active", i === currentIndex);
	});
}

function nextSlide() {
	showSlide(currentIndex + 1);
}

function prevSlide() {
	showSlide(currentIndex - 1);
}

function currentSlide(index) {
	showSlide(index - 1);
}

function startAutoSlide() {
	autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopAutoSlide() {
	clearInterval(autoSlideInterval);
}

let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
	touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
	touchEndX = event.changedTouches[0].clientX;
	const diff = touchStartX - touchEndX;
	if (diff > 50) {
		nextSlide();
	} else if (diff < -50) {
		prevSlide();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	showSlide(currentIndex);
	startAutoSlide();
	const carousel = document.querySelector(".carousel-inner");

	// Use passive: true for touchstart and touchend events
	carousel.addEventListener("touchstart", handleTouchStart, { passive: true });
	carousel.addEventListener("touchend", handleTouchEnd, { passive: true });

	carousel.addEventListener("mouseenter", stopAutoSlide);
	carousel.addEventListener("mouseleave", startAutoSlide);
});
