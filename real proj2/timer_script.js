// timer_script.js

document.addEventListener('DOMContentLoaded', () => {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');
    const selectedPastaDisplay = document.getElementById('selected-pasta-display'); // Today's Pasta 표시 요소
    const levelButtons = document.querySelectorAll('.level-button'); // 익힘 정도 버튼들

    let totalSeconds = 0;
    let timerInterval;
    let isRunning = false;
    let selectedCookingLevel = 'al dente'; // 기본 익힘 정도 설정

    // URL 쿼리 파라미터에서 파스타 타입 가져오기
    // 예: pasta_timer.html?type=spaghetti
    const urlParams = new URLSearchParams(window.location.search);
    const pastaType = urlParams.get('type') || 'Unknown Pasta'; // 기본값 설정

    // 파스타 종류별 기본 조리 시간 (al dente 기준, 초 단위)
    const pastaCookingTimes = {
        'farfalle': 8 * 60,
        'penne': 10 * 60,
        'macaroni': 7 * 60,
        'fusilli': 9 * 60,
        'spaghetti': 8 * 60,
        'linguine': 9 * 60,
        'fettuccine': 10 * 60,
        'lasagna': 25 * 60 // 라자냐는 오븐 조리 시간 기준으로 길게 설정
    };

    // 익힘 정도별 시간 보정 (알 덴테 기준)
    const cookingLevelModifiers = {
        'undercooked': -60, // 1분 적게
        'al dente': 0,      // 보정 없음
        'overcooked': +120  // 2분 많게
    };

    // --- 초기화 및 UI 업데이트 ---

    // "Today's Pasta is:" 텍스트 업데이트
    selectedPastaDisplay.textContent = `Today's Pasta is: ${pastaType.charAt(0).toUpperCase() + pastaType.slice(1)}`;

    // 초기 시간 설정 및 표시 업데이트
    setTimerForSelectedPasta();
    updateDisplay();

    // --- 이벤트 리스너 ---

    // 익힘 정도 버튼 클릭 이벤트
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼의 active 클래스 제거
            levelButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');
            
            selectedCookingLevel = button.dataset.level; // 선택된 익힘 정도 업데이트
            
            stopTimer(); // 타이머 정지 (시간 변경 시)
            setTimerForSelectedPasta(); // 새로운 시간으로 타이머 설정
            updateDisplay(); // 화면 업데이트
        });
    });

    startStopButton.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    resetButton.addEventListener('click', resetTimer);

    // --- 함수 정의 ---

    function setTimerForSelectedPasta() {
        let baseTime = pastaCookingTimes[pastaType] || pastaCookingTimes['spaghetti']; // 기본 파스타 시간 (없으면 스파게티)
        let modifier = cookingLevelModifiers[selectedCookingLevel] || 0; // 익힘 정도 보정 시간

        totalSeconds = baseTime + modifier;
        if (totalSeconds < 0) totalSeconds = 0; // 시간이 음수가 되지 않도록 방지
    }

    function updateDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (isRunning || totalSeconds <= 0) return; // 이미 실행 중이거나 시간이 0이면 시작 안 함
        isRunning = true;
        startStopButton.textContent = 'Stop';

        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startStopButton.textContent = 'Start';
                alert('Done!');
                // 여기에 소리 재생 등 추가 기능 구현
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
    }

    function resetTimer() {
        stopTimer();
        setTimerForSelectedPasta(); // 초기 시간으로 다시 설정 (현재 선택된 익힘 정도와 파스타 기준)
        updateDisplay();
    }
});