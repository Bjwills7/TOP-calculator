const screen = document.querySelector('.screen');
const button = Array.from(document.querySelectorAll('.button'));
const btnDisplay = Array.from(document.querySelectorAll('.display'));
btnDisplay.forEach(btn => btn.addEventListener('click', () => updateDisplay(btn)));
button[19].addEventListener('click', () => compute(screen.textContent));
button[3].addEventListener('click', () => backSpace());
 
    



function compute(displayStr) {
    console.log(`Beep Boop Beep...take it back! ${displayStr}`)
}

function checkDec(txt, btn) {
    let numArr = txt.split('+' || '-' || '×');
    numArr.forEach(value => {
        if (value.includes('.' && btn === '.')) {
            return true;
        }
        return false;
    });
    return numArr;
    // use array of objects to assign bool instead?
}

function updateDisplay(btn) {
    let lastChar = String(screen.textContent).charAt(screen.textContent.length - 1);
    let screenText = screen.textContent;
    let btnText = btn.textContent;
    if (screenText === '0' && !isNaN(btnText)) {
        screenText = btnText;
    } else if (screenText === '-0' && !isNaN(btnText)) {
        screenText = screenText.slice(0, -1) + btnText;
    } else if ((lastChar === '×' || lastChar === '-' || lastChar === '+') &&
               (btnText === '×' || btnText === '-' || btnText === '+')) {      
        screenText = screenText.slice(0, -1);
        screenText += btnText;
    } else if (btnText === '±') {
        screenText = screenText[0] !== '-' ? `-${screenText}` : screenText.slice(1);
    } else if (false) {
        
    } else {
        screenText += btnText;
    }
    screen.textContent = screenText;
}

function backSpace() {
    let screenText = screen.textContent;
    screenText = screenText.slice(0, -1);
    screenText = screenText === '' ? '0' : screenText;
    screenText = screenText === '-' ? '-0' : screenText;
    screen.textContent = screenText;
}

//lookup slice
