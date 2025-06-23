// script.js (메인 페이지용)

document.addEventListener('DOMContentLoaded', () => {
    const pastaItems = document.querySelectorAll('.pasta-item');

    pastaItems.forEach(item => {
        item.addEventListener('click', () => {
            const pastaType = item.dataset.type; // data-type 속성 값 가져오기
            // 타이머 페이지로 이동하며 파스타 타입을 URL 파라미터로 전달
            window.location.href = `pasta_timer.html?type=${pastaType}`;
        });
    });
});