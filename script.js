const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

let currentSlide = 0;
let previousSlide = 0;

function goToSlide(newIndex, direction = "next") {
  if (newIndex === currentSlide) return;

  const outgoingSlide = slides[currentSlide];
  const incomingSlide = slides[newIndex];

  // Reset previous animation styles
  slides.forEach((slide) => {
    slide.style.transition = "none";
    slide.style.opacity = "0";
    slide.style.transform = "translateX(100%)";
  });

  // Set direction
  if (direction === "prev") {
    incomingSlide.style.transform = "translateX(-100%)";
  }

  // Force reflow
  void incomingSlide.offsetWidth;

  // Animate slides
  outgoingSlide.style.transition = "all 0.4s ease";
  incomingSlide.style.transition = "all 0.4s ease";

  outgoingSlide.style.transform =
    direction === "next" ? "translateX(-100%)" : "translateX(100%)";
  outgoingSlide.style.opacity = "0";

  incomingSlide.style.transform = "translateX(0)";
  incomingSlide.style.opacity = "1";

  // Update dots
  dots[currentSlide].classList.remove("dot--fill");
  dots[newIndex].classList.add("dot--fill");

  currentSlide = newIndex;
}

btnRight.addEventListener("click", () => {
  const nextSlide = (currentSlide + 1) % slides.length;
  goToSlide(nextSlide, "next");
});

btnLeft.addEventListener("click", () => {
  const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(prevSlide, "prev");
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index, index > currentSlide ? "next" : "prev");
  });
});

// Initial state
slides.forEach((slide, i) => {
  slide.style.position = "absolute";
  slide.style.top = "0";
  slide.style.left = "0";
  slide.style.width = "100%";
  slide.style.transition = "all 0.4s ease";
  slide.style.opacity = i === 0 ? "1" : "0";
  slide.style.transform = i === 0 ? "translateX(0)" : "translateX(100%)";
  slide.style.zIndex = i === 0 ? "1" : "0";
});
