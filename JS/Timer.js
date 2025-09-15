const clock = document.getElementById('clock');
const topHalf = document.getElementById('topHalf');
const bottomHalf = document.getElementById('bottomHalf');
const topResult = document.getElementById('topResult');
const bottomResult = document.getElementById('bottomResult');
const topLost = document.getElementById('topLost');
const bottomLost = document.getElementById('bottomLost');

let isRunning = false;
let activePlayer = 1;
const initialTime = 5 * 60; // 5 minutes
let timeLeft1 = initialTime;
let timeLeft2 = initialTime;
let interval = null;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplays() {
    topHalf.textContent = formatTime(timeLeft1);
    bottomHalf.textContent = formatTime(timeLeft2);
    topHalf.classList.toggle('active', activePlayer === 1);
    bottomHalf.classList.toggle('active', activePlayer === 2);
    // Re-append icons
    topHalf.appendChild(topResult);
    topHalf.appendChild(topLost);
    bottomHalf.appendChild(bottomResult);
    bottomHalf.appendChild(bottomLost);
}

function startTimer() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
        if (activePlayer === 1) {
            timeLeft1 = Math.max(0, timeLeft1 - 1);
            if (timeLeft1 <= 0) {
                stopTimer();
                showResult(1);
            }
        } else {
            timeLeft2 = Math.max(0, timeLeft2 - 1);
            if (timeLeft2 <= 0) {
                stopTimer();
                showResult(2);
            }
        }
        updateDisplays();
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
    isRunning = false;
}

function switchPlayer() {
    activePlayer = activePlayer === 1 ? 2 : 1;
    updateDisplays();
}

function handleClick(part) {
    if (!isRunning) {
        isRunning = true;
        startTimer();
    }
    if ((activePlayer === 1 && part === 'top') || (activePlayer === 2 && part === 'bottom')) {
        switchPlayer();
    }
}

function showResult(lostPlayer) {
    if (lostPlayer === 1) {
        // Player 1 lost
        topLost.innerHTML = '<i class="fa-jelly-fill fa-regular fa-hourglass"></i>';
        topLost.style.display = 'flex';
        bottomResult.innerHTML = '<i class="fa-etch fa-solid fa-crown"></i>';
        bottomResult.style.display = 'flex';
    } else {
        // Player 2 lost
        bottomLost.innerHTML = '<i class="fa-jelly-fill fa-regular fa-hourglass"></i>';
        bottomLost.style.display = 'flex';
        topResult.innerHTML = '<i class="fa-etch fa-solid fa-crown"></i>';
        topResult.style.display = 'flex';
    }
}

// Event listeners
topHalf.addEventListener('click', () => handleClick('top'));
bottomHalf.addEventListener('click', () => handleClick('bottom'));

// Initial setup
updateDisplays();