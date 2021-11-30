"use strict";

const gradationMarkClass = "gradation-mark";
const arrowClass = "arrow";

const container = document.getElementById("container");

/*         add hours marks 
************************************/
for (let i = 0; i < 4; i++) {
    const gradationMark = document.createElement("div");
    gradationMark.className = gradationMarkClass + " extra-bold";
    gradationMark.style.transform = `rotate(${i * 90}deg)`;
    container.appendChild(gradationMark);
}

/*         add minutes marks 
************************************/
for (let i = 0; i < 60; i++) {
    // skip hours marks
    if (i % 15 === 0) {
        continue;
    }
    const gradationMark = document.createElement("div");
    gradationMark.className = i % 5 === 0 ? gradationMarkClass + " bold" : gradationMarkClass;
    gradationMark.style.transform = `rotate(${i * 6}deg)`;
    container.appendChild(gradationMark);
}

/*         add half minute marks 
************************************/
for (let i = 0; i < 120; i++) {
    // skip minutes marks
    if (i % 2 === 0) {
        continue;
    }
    const gradationMark = document.createElement("div");
    gradationMark.className = gradationMarkClass + " millis";
    gradationMark.style.transform = `rotate(${i * 3}deg)`;
    container.appendChild(gradationMark);
}

/*         add arrows
************************************/
for (let i = 0; i < 3; i++) {
    const arrow = document.createElement("div");
    switch (i) {
        case 0:
            arrow.className = arrowClass + " seconds-arrow neon-dim hue-rotate-1";
            break;
        case 1:
            arrow.className = arrowClass + " minutes-arrow neon-dim hue-rotate-2";
            break;
        case 2:
            arrow.className = arrowClass + " hours-arrow neon";
            break;
        default:
            break;
    }
    container.appendChild(arrow);
}

const hoursArrow = document.querySelector('.hours-arrow');
const minutesArrow = document.querySelector('.minutes-arrow');
const secondsArrow = document.querySelector('.seconds-arrow');

const secondsTimeDisplay = document.createElement("div");
secondsTimeDisplay.className = "time-display neon-text-green hue-rotate-1";
secondsArrow.appendChild(secondsTimeDisplay);

const minutesTimeDisplay = document.createElement("div");
minutesTimeDisplay.className = "time-display neon-text-green hue-rotate-2";
minutesArrow.appendChild(minutesTimeDisplay);

const hoursTimeDisplay = document.createElement("div");
hoursTimeDisplay.className = "time-display neon-text-green";
hoursArrow.appendChild(hoursTimeDisplay);

const degCalibrate = 90; // calibrate initial arrows position
let degreeFixer = 0; // this variable will be used to fix seconds arrow jumping back from 360 to degrees

setInterval(() => {
    const timeNow = new Date();
    let secondsRotationDeg = timeNow.getSeconds() * 6 + degCalibrate + degreeFixer;
    const minutesRotationDeg = (timeNow.getMinutes() + timeNow.getSeconds() / 60) * 6 + degCalibrate;
    const hoursRotationDeg = (timeNow.getHours() + timeNow.getMinutes() / 60) * 30 + degCalibrate;

    // append 360deg to seconds value
    if (secondsRotationDeg - degCalibrate - degreeFixer === 0) {
        degreeFixer += 360;
        secondsRotationDeg += 360;
    }

    // reset values
    if (degreeFixer === 3600) {
        degreeFixer = 0;
        secondsRotationDeg = 0;
    }
    // rotate arrows
    secondsArrow.style.transform = `rotate(${secondsRotationDeg}deg)`;
    minutesArrow.style.transform = `rotate(${minutesRotationDeg}deg)`;
    hoursArrow.style.transform = `rotate(${hoursRotationDeg}deg)`;

    // change time display
    secondsTimeDisplay.innerText = timeNow.getSeconds();
    minutesTimeDisplay.innerText = timeNow.getMinutes();
    hoursTimeDisplay.innerText = timeNow.getHours();

    // negative time display rotate
    secondsTimeDisplay.style.transform = `rotate(${-secondsRotationDeg}deg)`;
    minutesTimeDisplay.style.transform = `rotate(${-minutesRotationDeg}deg)`;
    hoursTimeDisplay.style.transform = `rotate(${-hoursRotationDeg}deg)`;

}, 1000);