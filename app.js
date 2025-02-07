let mainDiv = document.getElementById("main");
let text = 'just go on and faith will soon return';
let counter;

let textNode;

let startTime;
let endTime;

document.getElementById('startButton').addEventListener('click', startInput);

function startInput() {
    removeChildren(mainDiv);
    counter = 0;
    document.getElementById('controlBar').lastElementChild.textContent = '';

    // adding text to div
    for (char of text) {
        mainDiv.appendChild(getColorCharSpan(char));
    }

    textNode = mainDiv.firstChild;

    window.addEventListener("keydown", handleKeydown);

    this.blur();
}

function removeChildren(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function isValidKey(key) {
    let charCode = key.charCodeAt(0);
    console.log(charCode);
    return (charCode === 32 || charCode === 66 || (charCode >= 97 && charCode <= 122));
}

function getColorCharSpan(char) {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('unwrittenSpan');
    return span;
}

function setRoundEdges(span, isForward) {
    span.classList.remove('singleSpan');
    span.classList.remove('firstSpan');
    span.classList.remove('lastSpan');

    if (counter === 1) {
        if (isForward) {
            span.classList.add('singleSpan');
        }
        else {
            span.previousElementSibling.classList.remove('firstSpan');
            span.previousElementSibling.classList.add('singleSpan');
        }
    }
    else if (counter === 2) {
        if (isForward) {
            span.previousElementSibling.classList.remove('singleSpan');
            span.previousElementSibling.classList.add('firstSpan');
            span.classList.add('lastSpan');
        }
        else {
            span.previousElementSibling.classList.add('lastSpan');
        }
    }
    else {
        if (isForward) {
            span.previousElementSibling.classList.remove('lastSpan');
            span.classList.add('lastSpan');
        }
        else {
            span.previousElementSibling.classList.add('lastSpan');
        }

    }
}

function handleKeydown(e) {
    if (!isValidKey(e.key)) return;

    if (counter === 0) startTime = new Date().getTime();

    if (e.key === 'Backspace') {
        counter--;

        if (counter < 0) {
            counter = 0;
            return;
        }

        textNode.previousElementSibling.classList.remove('writtenCorrectSpan');
        textNode.previousElementSibling.classList.remove('writtenWrongSpan');
        textNode.previousElementSibling.classList.add('unwrittenSpan');

        textNode = textNode.previousElementSibling;

        setRoundEdges(textNode);
    }
    else if (textNode.textContent === e.key) {
        counter++;

        textNode.classList.remove('unwrittenSpan');
        textNode.classList.add('writtenCorrectSpan');
        setRoundEdges(textNode, true);

        textNode = textNode.nextElementSibling;

        if (textNode === null) endInput();
    }
    else {
        counter++;

        textNode.classList.remove('unwrittenSpan');
        textNode.classList.add('writtenWrongSpan');
        setRoundEdges(textNode, true);

        textNode = textNode.nextElementSibling;

        if (textNode === null) endInput();
    }

    console.log(counter);
}

function endInput() {
    window.removeEventListener('keydown', handleKeydown);
    endTime = new Date().getTime();
    document
        .getElementById('controlBar')
        .lastElementChild
        .textContent = `${(text.length / (endTime - startTime) * 1000).toFixed(1)} cps`;
}



