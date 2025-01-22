//VARIABLES
const digit1Div = document.getElementById('digit1');
const digit2Div = document.getElementById('digit2');
const digit3Div = document.getElementById('digit3');
const digit4Div = document.getElementById('digit4');
const unlockBtn = document.getElementById('unlock');
const hint = document.getElementById('hint');
const html = document.querySelector('html');
const container = document.getElementById('container');


const colors = [
    { r: 251, g: 0, b: 251 },
    { r: 251, g: 0, b: 133 },
    { r: 251, g: 0, b: 0 },
    { r: 251, g: 133, b: 0 },
    { r: 251, g: 251, b: 0 },
    { r: 133, g: 251, b: 0 },
    { r: 0, g: 251, b: 0 },
    { r: 0, g: 251, b: 133 },
    { r: 0, g: 251, b: 251 },
    { r: 0, g: 133, b: 251 },
    { r: 0, g: 0, b: 251 },
    { r: 133, g: 0, b: 251 },
    { r: 251, g: 0, b: 251 },
    { r: 251, g: 0, b: 133 },
    { r: 251, g: 0, b: 0 }
];

const digitDivs = [digit1Div, digit2Div, digit3Div, digit4Div];
let solution = [];

//PROGRAM
const bgColor = Math.floor(Math.random() * colors.length);
const divColor = Math.floor(Math.random() * colors.length);
const rgbToCss = (rgb, transp) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transp})`;

html.style.backgroundColor = rgbToCss(colors[bgColor], 0.1);
container.style.backgroundColor = rgbToCss(colors[divColor], 0.3);
unlockBtn.style.backgroundColor = rgbToCss(colors[divColor], 0.9);

append(digit1Div, 0);
append(digit2Div, 0);
append(digit3Div, 0);
append(digit4Div, 0);
initSolution();
console.log("solution", solution);


//FUNCTIONS
function append(digitDiv, num) {
    digitDiv.innerHTML = `<img src="${num}.png">`;
    digitDiv.setAttribute('data-value', num);
}

function initSolution() {
    for (let i = 0; i < 4; i++) {
        solution[i] = Math.floor(Math.random() * 10)
    }
}


//LISTENERS
digitDivs.forEach(digitDiv => {
    digitDiv.addEventListener('click', function () {
        const num = parseInt(digitDiv.getAttribute('data-value'));
        if (num == 9) append(digitDiv, 0);
        else append(digitDiv, num + 1);
    });

    digitDiv.addEventListener('wheel', function (event) {
        event.preventDefault(); // Prevent the default scroll behavior
        const num = parseInt(digitDiv.getAttribute('data-value'));
        if (event.deltaY < 0) {
            if (num == 9) append(digitDiv, 0);
            else append(digitDiv, num + 1);
        } else {
            if (num == 0) append(digitDiv, 9);
            else append(digitDiv, num - 1);
        }
    });
});

unlockBtn.addEventListener('click', function () {
    let map = [false, false, false, false];
    correctNumbers = 0;
    movedNumbers = 0;
    let html = '';
    for (let i = 0; i < 4; i++) {
        let divCurrentNumber = parseInt(digitDivs[i].getAttribute('data-value'));
        if (solution[i] == divCurrentNumber) {
            correctNumbers++;
            map[i] = true;
        }
    }
    if (map.every(value => value === true)) hint.innerHTML = "you win";
    else {
        for (let i = 0; i < 4; i++) {
            let divCurrentNumber = parseInt(digitDivs[i].getAttribute('data-value'));
            if (solution.includes(divCurrentNumber)) {
                let index = solution.indexOf(divCurrentNumber);
                if (map[index] == false) {
                    map[index] = true;
                    movedNumbers++;
                }
            }
        }
            html += `There are ${correctNumbers} digits in the correct position`;
            html += `<br>There are ${movedNumbers} digits in the incorrect position`;
            hint.innerHTML = html
        
    }

})





