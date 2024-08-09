function setTime() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    const secondDegrees = (seconds / 60) * 360 + 90;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360 + 90;
    const hourDegrees = ((hours + minutes / 60) / 12) * 360 + 90;

    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');

    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
}

setInterval(setTime, 1000);
setTime(); 