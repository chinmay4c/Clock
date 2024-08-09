// Main Clock Functions
function setTime() {
    const now = new Date();
    updateAnalogClock(now);
    updateDigitalClock(now);
    updateDateDisplay(now);
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
    const digitalClock = document.querySelector('.digital-clock');
    digitalClock.textContent = date.toLocaleTimeString();
}

function updateDateDisplay(date) {
    const dateDisplay = document.querySelector('.date-display');
    dateDisplay.textContent = date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function createMinuteMarks() {
    const clock = document.querySelector('.clock');
    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        mark.classList.add('minute-mark');
        mark.style.transform = `rotate(${i * 6}deg)`;
        mark.style.height = i % 5 === 0 ? '10px' : '5px';
        mark.style.width = i % 5 === 0 ? '2px' : '1px';
        mark.style.backgroundColor = 'var(--clock-color)';
        mark.style.position = 'absolute';
        mark.style.bottom = '50%';
        mark.style.left = 'calc(50% - 0.5px)';
        mark.style.transformOrigin = '50% 100%';
        clock.appendChild(mark);
    }
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
        `;
        container.appendChild(clockItem);
        updateWorldClocks();
    }
}

function updateWorldClocks() {
    const worldClocks = document.querySelectorAll('.world-time');
    const now = new Date();
    worldClocks.forEach(clock => {
        const city = clock.dataset.city;
        try {
            const time = now.toLocaleTimeString('en-US', { timeZone: city.replace(' ', '_') });
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

// Theme Switcher
function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    document.body.className = `${theme}-theme`;
}

// Event Listeners
document.getElementById('add-world-clock').addEventListener('click', addWorldClock);
document.getElementById('start-stop').addEventListener('click', startStopStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', lapStopwatch);
document.getElementById('theme-select').addEventListener('change', changeTheme);

// Initialization
createMinuteMarks();
setInterval(setTime, 1000);
setInterval(updateWorldClocks, 1000);
setTime();