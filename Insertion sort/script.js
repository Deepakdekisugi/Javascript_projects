const arrayLength = 40;
const numbers = [];

let audioContext = null;

initializeArray();

function initializeArray() {
    for (let i = 0; i < arrayLength; i++) {
        numbers[i] = Math.random();
    }
    renderBars();
}

function playSorting() {
    const sortingSteps = insertionSort([...numbers]);
    animateSorting(sortingSteps);
}

function animateSorting(sortingSteps) {
    if (sortingSteps.length === 0) {
        renderBars();
        return;
    }
    const [indexA, indexB] = sortingSteps.shift();
    [numbers[indexA], numbers[indexB]] = [numbers[indexB], numbers[indexA]];
    renderBars([indexA, indexB]);
    playNote(200 + numbers[indexA] * 500);
    playNote(200 + numbers[indexB] * 500);

    setTimeout(function () {
        animateSorting(sortingSteps);
    }, 30);
}

function insertionSort(arr) {
    const steps = [];

    for (let i = 1; i < arr.length; i++) {
        let j = i;

        while (j > 0 && arr[j - 1] > arr[j]) {
            steps.push([j - 1, j]);
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            j--;
        }
    }

    return steps;
}

function renderBars(highlightedIndices) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    for (let i = 0; i < numbers.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = numbers[i] * 100 + "%";
        bar.classList.add("bar");
        if (highlightedIndices && highlightedIndices.includes(i)) {
            bar.style.backgroundColor = "red";
        }
        container.appendChild(bar);
    }
}

function playNote(frequency) {
    if (audioContext === null) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const duration = 0.1;
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 200 + Math.sin(frequency) * 200;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;
    gainNode.gain.linearRampToValueAtTime(
        0, audioContext.currentTime + duration
    );
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
}
