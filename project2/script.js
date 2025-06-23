document.addEventListener('DOMContentLoaded', () => {
    const pastaTypeSelect = document.getElementById('pastaType');
    const donenessSelect = document.getElementById('doneness');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const countdownDisplay = document.getElementById('countdown');

    let countdownInterval;
    let totalSeconds = 0;

    // 파스타 종류별, 익힘 정도별 기본 삶는 시간 (초 단위)
    // 이 값들은 일반적인 권장 시간이며, 제품 및 개인 취향에 따라 다를 수 있습니다.
    const cookingTimes = {
        spaghetti: {
            alDente: 8 * 60,   // 8분
            medium: 9 * 60,    // 9분
            wellDone: 11 * 60  // 11분
        },
        fettuccine: {
            alDente: 7 * 60,
            medium: 8 * 60,
            wellDone: 10 * 60
        },
        penne: {
            alDente: 10 * 60,
            medium: 11 * 60,
            wellDone: 13 * 60
        },
        macaroni: {
            alDente: 6 * 60,
            medium: 7 * 60,
            wellDone: 9 * 60
        },
        fusilli: {
            alDente: 9 * 60,
            medium: 10 * 60,
            wellDone: 12 * 60
        },
        linguine: {
            alDente: 7 * 60,
            medium: 8 * 60,
            wellDone: 10 * 60
        },
        farfalle: {
            alDente: 10 * 60,
            medium: 11 * 60,
            wellDone: 13 * 60
        },
        lasagna: { // 오븐용 시트가 아닌 삶는 용도 (보통 끓는 물에 살짝만 삶음)
            alDente: 3 * 60,
            medium: 4 * 60,
            wellDone: 6 * 60
        }
    };

    function updateCountdownDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function startTimer() {
        clearInterval(countdownInterval); // 기존 타이머가 있다면 초기화

        const selectedPastaType = pastaTypeSelect.value;
        const selectedDoneness = donenessSelect.value;

        totalSeconds = cookingTimes[selectedPastaType][selectedDoneness];
        
        if (isNaN(totalSeconds) || totalSeconds <= 0) {
            alert('올바른 파스타 종류와 익힘 정도를 선택해주세요.');
            return;
        }

        updateCountdownDisplay(totalSeconds);
        startButton.classList.add('hidden');
        resetButton.classList.remove('hidden');

        countdownInterval = setInterval(() => {
            totalSeconds--;
            updateCountdownDisplay(totalSeconds);

            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.textContent = "완료! 🥳";
                alert('파스타가 다 삶아졌습니다!');
                startButton.classList.remove('hidden');
                resetButton.classList.add('hidden');
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(countdownInterval);
        totalSeconds = 0;
        updateCountdownDisplay(0);
        startButton.classList.remove('hidden');
        resetButton.classList.add('hidden');
        countdownDisplay.textContent = "00:00"; // 초기 상태로 복구
    }

    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);

    // 페이지 로드 시 초기값 설정 및 표시
    updateCountdownDisplay(0);
});