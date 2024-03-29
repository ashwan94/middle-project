// 자바스크립트로 세로 슬라이드 구현
const sliderContent = document.querySelector('.slider-content');
const sliderItems = document.querySelectorAll('.slider-item');
let currentIndex = 0;
const slideHeight = sliderItems[0].offsetHeight;

function slideNext() {
    currentIndex++;
    if (currentIndex >= sliderItems.length) {
        currentIndex = 0; // 마지막 슬라이드인 경우 첫 번째 슬라이드로 돌아감
    }
    const translateValue = -currentIndex * slideHeight;
    sliderContent.style.transform = `translateY(${translateValue}px)`;
}

setInterval(slideNext, 3000);