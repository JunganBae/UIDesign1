// timer_script.js

document.addEventListener('DOMContentLoaded', () => {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');
    const selectedPastaDisplay = document.getElementById('selected-pasta-display');
    const levelButtons = document.querySelectorAll('.level-button');

    // 오디오 요소 동적으로 생성
    const backgroundMusicAudio = new Audio('audio/classical_music.mp3');
    backgroundMusicAudio.loop = true; // 루프 재생 설정
    backgroundMusicAudio.muted = true; // 초기에는 음소거 (자동 재생 정책 대응)
    // backgroundMusicAudio.volume = 0.5; // 필요하다면 볼륨 설정 (0.0 ~ 1.0)

    let totalSeconds = 0;
    let timerInterval;
    let isRunning = false;
    let selectedCookingLevel = 'al dente';

    // URL 쿼리 파라미터에서 파스타 타입 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const pastaType = urlParams.get('type') || 'Unknown Pasta';

    // 파스타 종류별 기본 조리 시간 (al dente 기준, 초 단위)
    const pastaCookingTimes = {
        'farfalle': 8 * 60,
        'penne': 10 * 60,
        'macaroni': 7 * 60,
        'fusilli': 9 * 60,
        'spaghetti': 8 * 60,
        'linguine': 9 * 60,
        'fettuccine': 10 * 60,
        'lasagna': 25 * 60 
    };

    // 익힘 정도별 시간 보정 (알 덴테 기준)
    const cookingLevelModifiers = {
        'undercooked': -60, // 1분 적게
        'al dente': 0,      // 보정 없음
        'overcooked': +120  // 2분 많게
    };

    // --- 초기화 및 UI 업데이트 ---
    selectedPastaDisplay.textContent = `Today's Pasta is: ${pastaType.charAt(0).toUpperCase() + pastaType.slice(1)}`;
    setTimerForSelectedPasta();
    updateDisplay();

    // --- 이벤트 리스너 ---
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            levelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedCookingLevel = button.dataset.level;
            
            stopTimer(); // 익힘 정도 변경 시 타이머 정지 (음악도 정지)
            setTimerForSelectedPasta(); // 새로운 시간 설정
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
        let baseTime = pastaCookingTimes[pastaType] || pastaCookingTimes['spaghetti'];
        let modifier = cookingLevelModifiers[selectedCookingLevel] || 0;

        totalSeconds = baseTime + modifier;
        if (totalSeconds < 0) totalSeconds = 0;
    }

    function updateDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (isRunning || totalSeconds <= 0) return;
        isRunning = true;
        startStopButton.textContent = 'Stop';
        
        // 오디오 재생 시도 및 음소거 해제 (사용자 상호작용 후)
        backgroundMusicAudio.muted = false; // 타이머 시작 시 음소거 해제
        backgroundMusicAudio.play().catch(error => {
            console.log('Background music auto-play prevented:', error);
            // 대부분의 경우 사용자 상호작용(시작 버튼 클릭)이 있었으므로 재생될 것입니다.
            // 하지만 예외 상황(예: 브라우저 설정)에 대비합니다.
        });

        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startStopButton.textContent = 'Start';
                backgroundMusicAudio.pause(); // 타이머 종료 시 오디오 일시정지
                backgroundMusicAudio.currentTime = 0; // 오디오 처음으로 되감기
                backgroundMusicAudio.muted = true; // 다시 음소거
                alert('Done!');
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
        backgroundMusicAudio.pause(); // 타이머 정지 시 오디오 일시정지
        backgroundMusicAudio.muted = true; // 다시 음소거
        // backgroundMusicAudio.currentTime = 0; // 정지 시 처음으로 되감고 싶으면 주석 해제
    }

    function resetTimer() {
        stopTimer(); // 오디오도 함께 정지
        setTimerForSelectedPasta(); // 초기 시간으로 다시 설정
        updateDisplay();
        backgroundMusicAudio.currentTime = 0; // 리셋 시 오디오도 처음으로 되감기
        backgroundMusicAudio.muted = true; // 리셋 시 다시 음소거
    }
});