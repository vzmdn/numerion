//VARIABLES
const digit1Div = document.getElementById('digit1');
const digit2Div = document.getElementById('digit2');
const digit3Div = document.getElementById('digit3');
const digit4Div = document.getElementById('digit4');
const unlockBtn = document.getElementById('unlock');
const hint = document.getElementById('hint');

const digitDivs = [digit1Div, digit2Div, digit3Div, digit4Div];
let solution = [];

//PROGRAM
append(digit1Div, 0);
append(digit2Div, 0);
append(digit3Div, 0);
append(digit4Div, 0);
initSolution();
console.log(solution);
console.log(digitDivs)


//FUNCTIONS
function append(digitDiv, num) {
    digitDiv.innerHTML = `<img src="${num}.png">`;
    digitDiv.setAttribute('data-value', num);
}

function initSolution(){
    for(let i = 0; i < 4; i++){
        solution[i] = Math.floor(Math.random()*10)
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
        if (event.deltaY < 0) { // Wheel up
            if (num == 9) append(digitDiv, 0);
            else append(digitDiv, num + 1);
        } else { // Wheel down
            if (num == 0) append(digitDiv, 9);
            else append(digitDiv, num - 1);
        }
    });
});

unlockBtn.addEventListener('click', function () {
    correctNumbers = 0;
    movedNumbers = 0;
    let html = '';
    for(let i = 0; i < 4; i++){
        if (solution[i] == digitDivs[i].getAttribute('data-value')){
            correctNumbers++;
        }
    }
    hint.innerHTML = `There are ${correctNumbers} digits in the correct position`
})





