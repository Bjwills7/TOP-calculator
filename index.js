const screen = document.querySelector('.screen');
const button = Array.from(document.querySelectorAll('.button'));
const btnDisplay = Array.from(document.querySelectorAll('.display'));

btnDisplay.forEach(btn => btn.addEventListener('click', () => updateDisplay(btn)));
button[19].addEventListener('click', () => compute());
button[1].addEventListener('click', () => backSpace());
button[0].addEventListener('click', () => clear());

let arrOne = [];
let op = [];
let arrTwo = [];
let screenArr = ['0'];
let screenText = screen.textContent;

// Math operation functions
function square() {
    let temp = screenArr.join('') * 100;
    let answer = (temp * temp) / 10000;
    clear();
    screenArr = [];
    screenArr.push(String(answer));
}

function compute(displayStr) {
    if (checkNaN()) arrTwo.unshift('0');
    let a = +arrOne.join('') * 100;
    let b = +arrTwo.join('') * 100;
    if (op[0] === '×') {
        screenText = (a * b) / 10000;
    } else if (op[0] === '−') {
        screenText = (a - b) / 100;
    } else if (op[0] === '+') {
        screenText = (a + b) / 100;
    } else if (op[0] === '÷') {
        screenText = (a / b) 
    }
    isDivByZero() ? divByZeroAppend() : appendOnCompute();
}


// functions for compute()
function isDivByZero() {
    if (arrTwo.length === 1 && arrTwo[0] === '0' && op[0] === '÷') return true;
    else return false;
}

function divByZeroAppend () {
    clear();
    screen.textContent = "You can't divide by zero!"
}

function checkNaN() { // Checks if user tries to operate on a lone decimal
    if (arrTwo.indexOf('.') === 0 && !arrTwo[1]) {
        return true;
    } else {
        return false;
    }
}

function appendOnCompute() {
    arrOne = String(screenText).split('');
    screenArr = arrOne;
    screenText = String(arrOne.join(''));
    screen.textContent = screenText;
    op = [];
    arrTwo = [];
}


// Main function Determines what happens onscreen when a button is pressed
    // and updates stored data
function updateDisplay(btn) {
    let btnText = btn.textContent;
    if (((screenText === '0' || screenText === '-0') && !isNaN(btnText)) ||
    (checkScreenOp() && checkOp(btnText)) ||
    (checkPostOp(btnText) && !checkOp(btnText))) {
        screenArr.pop();
        screenArr.push(btnText);
    } else if (btnText === '±') {
        changeSign();
    } else if (btnText === 'x²') {
        if (checkArrOp(screenArr)) return;
        else square();
    } else if ((op.length > 0 && arrTwo.includes('.') && btnText === '.') ||
    (op.length < 1 && arrOne.includes('.') && btnText === '.') || 
    (checkArrOp(screenArr) && checkOp(btnText))) {
        return;
    } else {
        screenArr.push(btnText);
    };
    checkLength(screenArr);
    splitArr(screenArr);
    screenText = screenArr.join('');
    screen.textContent = screenText;
}


// Functions that format data or return data for use in math functions
function splitArr(arr) { // Splits array into 3 arrays at the operator
    if (checkArrOp(screenArr)) {
        arrOne = arr.slice(0, arr.lastIndexOf(identifyOp(arr)));
        op = arr.slice(arr.lastIndexOf(identifyOp(arr)), arr.lastIndexOf(identifyOp(arr)) + 1);
        arrTwo = arr.slice(arr.lastIndexOf(identifyOp(arr)) + 1);
    } else {
        arrOne = screenArr;
        op = [];
        arrTwo = [];
    }
}

function identifyOp(arr) { // Checks what operator the array contains
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '−' && arr[i - 1] !== 'e') return '−';
        else if (arr[i] === '+' && arr[i - 1] !== 'e') return '+';
        else if (arr[i] === '×') return '×';
        else if (arr[i] === '÷') return '÷';
    }
}

function checkLength(arr) { // Prevents numbers from going off screen
    for (let i = arr.length -1; i >= 26; i--) {
        if (checkArrOp(arr)) arr.pop();
        else arr.shift();
    }
}


// functions for individual buttons
function changeSign() {
    if (!arrOne[0]) arrOne.push('0');
    if (!op.length) {
        arrOne[0] !== '-' ? arrOne.unshift('-') : arrOne.shift();
    } else {
        arrTwo[0] !== '-' ? arrTwo.unshift('-') : arrTwo.shift();
    }
    screenArr = arrOne.concat(op, arrTwo);
}

function clear() {
    arrOne = [];
    op = [];
    arrTwo = [];
    screenArr = ['0'];
    screen.textContent = '0';
    screenText = screen.textContent;
}

function backSpace() {
    screenArr.pop();
    if (screenArr.length < 1) {screenArr.push('0')}
    else if (screenArr[0] === '-' && screenArr.length < 2) {
        screenArr.shift();
        screenArr.push('0')};
        splitArr(screenArr);
        screenText = screenArr.join('');
        screen.textContent = screenArr.join('');
    }
    

    // Check functions that are used in conditionals 
    function checkScreenOp() { // Checks if lastChar in screen text is an operator
        let lastChar = String(screen.textContent).charAt(screen.textContent.length - 1);
        return lastChar === '×' ||
        lastChar === '−' ||
        lastChar === '+' ||
        lastChar === '÷' ? true : false;
    }
    
    function checkOp(char) { // Checks if text is an operator
        return char === '×' ||
        char === '−' ||
        char === '+' ||
        char === '÷' ? true : false;
    }
    
    function checkArrOp(arr) { // Returns true if an array contains an operator
        for (let i = 0; i < arr.length; i++) {
            if (checkOp(arr[i]) && arr[i - 1] !== 'e') {
                return true;
            } else if (i === arr.length - 1) {
                return false;
            }
        }
    }

    function checkPostOp(btnText) { // Checks for meaningless zeroes after operator
        if (screenArr[screenArr.indexOf(identifyOp(screenArr)) + 1] === '0' && 
        screenArr[screenArr.indexOf(identifyOp(screenArr)) + 2] !== '.' &&
        btnText !== '.') {
            return true;
        } else {
            return false;
        }
    }