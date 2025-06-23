// script.js (메인 화면용 스크립트)

document.addEventListener('DOMContentLoaded', () => {
    const pastaItems = document.querySelectorAll('.pasta-item');

    pastaItems.forEach(item => {
        item.addEventListener('click', () => {
            const pastaType = item.dataset.type; // data-type 속성에서 파스타 종류 가져오기
            if (pastaType) {
                // pasta_timer.html로 이동하면서 파스타 종류를 URL 파라미터로 넘김
                window.location.href = `pasta_timer.html?type=${pastaType}`;
            }
        });
    });
});