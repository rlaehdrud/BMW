const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.arrow.left');
const nextButton = document.querySelector('.arrow.right');
const tabs = document.querySelectorAll('.tab');

let currentIndex = 0;

// 반응형 슬라이드 순서 설정
function getSlideOrder() {
    return window.innerWidth <= 672 ? [0, 2, 1, 3] : [0, 1, 2, 3];
}

// 슬라이드 이동 거리 계산
function getSlideWidth() {
    return slideItems.length > 0 ? slideItems[0].offsetWidth : 0;
}

// 슬라이드 순서 재배치 (Flexbox order 사용)
function reorderSlides() {
    const slideOrder = getSlideOrder();
    slideOrder.forEach((order, index) => {
        slideItems[order].style.order = index;
    });
}

// 슬라이드 위치 업데이트 (순서를 정확히 적용)
function updateSlidePosition() {
    reorderSlides();
    const slideOrder = getSlideOrder();
    const targetIndex = slideOrder[currentIndex]; // 현재 반응형 순서 기준 인덱스 찾기
    const slideWidth = getSlideWidth();

    if (slideWidth === 0) return;

    slides.style.transition = 'transform 0.3s ease-in-out';
    slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`; // currentIndex 기준 이동

    updateActiveTab(targetIndex);
}


// 탭 활성화 상태 업데이트
function updateActiveTab(targetIndex) {
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === targetIndex);
    });
}

// 다음 버튼 클릭 이벤트
nextButton.addEventListener('click', () => {
    const slideOrder = getSlideOrder();
    currentIndex = (currentIndex + 1) % slideOrder.length;
    updateSlidePosition();
});

// 이전 버튼 클릭 이벤트
prevButton.addEventListener('click', () => {
    const slideOrder = getSlideOrder();
    currentIndex = (currentIndex - 1 + slideOrder.length) % slideOrder.length;
    updateSlidePosition();
});

// 탭 클릭 이벤트
// 탭 클릭 이벤트 수정
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        const slideOrder = getSlideOrder();
        const targetIndex = slideOrder.indexOf(index); // 현재 반응형 순서에서 클릭한 탭이 어디에 있는지 찾기

        if (targetIndex !== -1) {
            currentIndex = targetIndex;
            updateSlidePosition();
        }
    });
});


// 화면 크기 변경 시 슬라이드 유지
window.addEventListener('resize', () => {
    reorderSlides();
    updateSlidePosition();
});

// 초기 실행
window.addEventListener('load', () => {
    reorderSlides();
    updateSlidePosition();
});


