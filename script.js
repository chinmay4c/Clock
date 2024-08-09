// Main Clock Functions
function setTime() {
    const now = new Date();
    updateAnalogClock(now);
    updateDigitalClock(now);
}

function updateAnalogClock(date) {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

    document.querySelector('.second-hand').style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
}

function updateDigitalClock(date) {
    const digitalTime = document.querySelector('.digital-time');
    const digitalDate = document.querySelector('.digital-date');
    
    digitalTime.textContent = date.toLocaleTimeString('en-US', { hour12: false });
    digitalDate.textContent = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// World Clock Functions
function addWorldClock() {
    const city = prompt("Enter city name:");
    if (city) {
        const container = document.querySelector('.world-clock-container');
        const clockItem = document.createElement('div');
        clockItem.classList.add('world-clock-item');
        clockItem.innerHTML = `
            <span>${city}</span>
            <span class="world-time" data-city="${city}"></span>
            <button class="remove-city">X</button>
        `;
        container.appendChild(clockItem);
        clockItem.querySelector('.remove-city').addEventListener('click', () => container.removeChild(clockItem));
        updateWorldClocks();
    }
}

function updateWorldClocks() {
    const worldClocks = document.querySelectorAll('.world-time');
    const now = new Date();
    worldClocks.forEach(clock => {
        const city = clock.dataset.city;
        try {
            const time = now.toLocaleTimeString('en-US', { timeZone: city.replace(' ', '_'), hour12: false });
            clock.textContent = time;
        } catch (error) {
            clock.textContent = 'Invalid timezone';
        }
    });
}

// Stopwatch Functions
let stopwatchInterval;
let stopwatchTime = 0;
let isRunning = false;

function startStopStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        document.getElementById('start-stop').textContent = 'Start';
    } else {
        stopwatchInterval = setInterval(updateStopwatch, 10);
        document.getElementById('start-stop').textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function updateStopwatch() {
    stopwatchTime += 10;
    const display = document.querySelector('.stopwatch-display');
    display.textContent = formatTime(stopwatchTime);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    isRunning = false;
    document.querySelector('.stopwatch-display').textContent = '00:00:00.000';
    document.getElementById('start-stop').textContent = 'Start';
    document.querySelector('.lap-times').innerHTML = '';
}

function lapStopwatch() {
    if (isRunning) {
        const lapList = document.querySelector('.lap-times');
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(stopwatchTime);
        lapList.appendChild(lapItem);
    }
}

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 12);
}

// Timer Functions
let timerInterval;
let timerTime = 0;

function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    timerTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    
    if (timerTime > 0) {
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('start-timer').textContent = 'Pause';
    }
}

function updateTimer() {
    if (timerTime > 0) {
        timerTime -= 1000;
        const display = document.querySelector('.timer-display');
        display.textContent = new Date(timerTime).toISOString().substr(11, 8);
    } else {
        clearInterval(timerInterval);
        document.getElementById('start-timer').textContent = 'Start';
        alert('Timer finished!');
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerTime = 0;
    document.querySelector('.timer-display').textContent = '00:00:00';
    document.getElementById('start-timer').textContent = 'Start';
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setInterval(setTime, 1000);
    setInterval(updateWorldClocks, 1000);
    setTime();

    document.getElementById('add-world-clock').addEventListener('click', addWorldClock);
    document.getElementById('start-stop').addEventListener('click', startStopStopwatch);
    document.getElementById('reset').addEventListener('click', resetStopwatch);
    document.getElementById('lap').addEventListener('click', lapStopwatch);
    document.getElementById('start-timer').addEventListener('click', startTimer);
    document.getElementById('reset-timer').addEventListener('click', resetTimer);
});

// Futuristic Animation
function pulseAnimation() {
    const clock = document.querySelector('.clock');
    clock.style.animation = 'none';
    clock.offsetHeight; // Trigger reflow
    clock.style.animation = null;
}

setInterval(pulseAnimation, 4000);