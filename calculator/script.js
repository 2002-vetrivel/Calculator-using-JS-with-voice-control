const buttons = document.querySelectorAll('button');
const resultDisplay = document.getElementById('result');
const pastDisplay = document.getElementById('past');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backSpace');
const equalsButton = document.getElementById('equals');
const percentageButton = document.querySelector('#key[style*="background-color: #938BD3"]'); 

let currentInput = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerText;

        if (value === 'c') {
            currentInput = '';
            previousInput = '';
            resultDisplay.innerText = '0';
        }
        else if (value === '⌫') {
            currentInput = currentInput.slice(0, -1);
            resultDisplay.innerText = currentInput || '0';
        }
        else if (value === '=') {
            try {
                previousInput = currentInput;
                currentInput = eval(currentInput).toString();
                resultDisplay.innerText = currentInput;
                pastDisplay.innerText = previousInput;
            } catch (error) {
                resultDisplay.innerText = 'Error';
                currentInput = '';
            }
        }
        else if (value === '%') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                resultDisplay.innerText = currentInput;
            }
        }
        else {
            currentInput += value;
            resultDisplay.innerText = currentInput;
        }
    });
});

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        currentInput += ' ' + transcript;
        resultDisplay.innerText = currentInput;
    };
}
