const screen = document.querySelector('.screen');
const button = Array.from(document.querySelectorAll('.button'));
const btnDisplay = Array.from(document.querySelectorAll('.display'));
btnDisplay.forEach(btn => btn.addEventListener('click', () => updateDisplay(btn)));
button[19].addEventListener('click', () => compute(screen.textContent));
button[3].addEventListener('click', () => backSpace());
button[1].addEventListener('click', () => clear());
 
// to make sure only one operator is used at a time check screenArr.length
    // to ensure its length is 2

function compute(displayStr) {
    console.log(`Beep Boop Beep...take it back! ${displayStr}`)
}

let arrOne = [];
let op = [];
let arrTwo = [];
let screenArr = [];
let screenText = screen.textContent;

function updateDisplay(btn) {
    let btnText = btn.textContent;
    if (screenText === '0' && !isNaN(btnText)) {
        screenArr.pop();
        screenArr.push(btnText);
    } else if (checkScreenOp() && checkOp(btnText)) {      
        screenArr.pop();
        screenArr.push(btnText);
    } else if (btnText === '±') {
        changeSign();
    } else if (op.length > 0 && arrTwo.includes('.') && btnText === '.') {
        // do nothing
    } else if (op.length < 1 && arrOne.includes('.') && btnText === '.') {
        // do nothing
    } else {
        screenArr.push(btnText);
    };
    splitArr(screenArr);
    screenText = screenArr.join('');
    screen.textContent = screenText;
}

function clear() {
    arrOne = [];
    op = [];
    arrTwo = [];
    screenArr = [];
    screen.textContent = '0';
}

function changeSign() {
    if (!op.length) {
        arrOne[0] !== '-' ? arrOne.unshift('-') : arrOne.shift();
    } else {
        arrTwo[0] !== '-' ? arrTwo.unshift('-') : arrTwo.shift();
    }
    screenArr = arrOne.concat(op, arrTwo);
}

function splitArr(arr) { 
    if (arr.some(char => checkOp(char))) {
        arrOne = arr.slice(0, arr.indexOf(identifyOp(arr)));
        op = arr.slice(arr.indexOf(identifyOp(arr)), arr.indexOf(identifyOp(arr)) + 1);
        arrTwo = arr.slice(arr.indexOf(identifyOp(arr)) + 1);
    } else {
        arrOne = screenArr;
        op = [];
        arrTwo = [];
    }
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

function checkScreenOp() { // Checks if lastChar in screen text is an operator
    let lastChar = String(screen.textContent).charAt(screen.textContent.length - 1);
    return lastChar === '×' ||
           lastChar === '−' ||
           lastChar === '+' ||
           lastChar === '%' ? true : false;
}

function checkOp(char) { // Checks if button text is an operator
    return char === '×' ||
           char === '−' ||
           char === '+' ||
           char === '%' ? true : false;
}

function identifyOp(arr) { // Checks what operator the array contains
    for (let char of arr) {
        if (char === '−') {return '−'}
        else if (char === '+') {return '+'}
        else if (char === '×') {return '×'}
        else if (char === '%') {return '%'}
    }
}