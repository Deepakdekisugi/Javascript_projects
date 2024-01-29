myCanvas.width = 900;
myCanvas.height = 300;
const margin = 30;
const n = 30;
const array = [];
let moves = [];
const cols = [];
const spacing = (myCanvas.width - margin * 2) / n;
const ctx = myCanvas.getContext("2d");

const maxColumnHeight = 150;

init();

let audioCtx = null;

function playNote(freq, type) {
    if (audioCtx == null) {
      audioCtx = new (AudioContext ||
        webkitAudioContext ||
        window.webkitAudioContext)();
    }
    const dur = 0.2;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.type = type;
    osc.stop(audioCtx.currentTime + dur);
  
    const node = audioCtx.createGain();
    node.gain.value = 0.03;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
  }

function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  moves = [];
  for (let i = 0; i < array.length; i++) {
    const x = i * spacing + spacing / 2 + margin;
    const y = myCanvas.height - margin - i * 3;
    const width = spacing - 4;
    const height = maxColumnHeight * array[i];
    cols[i] = new Column(x, y, width, height);
  }
}


function updateAlgorithmInfo(algorithmName) {
  const infoDiv = document.getElementById("algorithmInfo");
  let algorithmInfo = "";

  switch (algorithmName) {
    case "bubbleSort":
      algorithmInfo = "Bubble Sort: This is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.";
      break;
    case "heapSort":
      algorithmInfo = "Heap Sort: Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and perform the sorting.";
      break;
    case "cycleSort":
      algorithmInfo = "Cycle Sort: Cycle sort is an in-place, unstable sorting algorithm that is optimal in terms of the total number of writes to the original array.";
      break;
    case "selectionSort":
      algorithmInfo = "Selection Sort: Selection sort is a simple comparison-based sorting algorithm that divides the input into a sorted and an unsorted region.";
      break;
    case "combSort":
      algorithmInfo = "Comb Sort: Comb sort is a relatively simple comparison-based sorting algorithm that improves on bubble sort by using a gap sequence to eliminate turtles.";
      break;
    case "stoogeSort":
      algorithmInfo = "Stooge Sort: Stooge sort is a recursive sorting algorithm that sorts the first two-thirds and last two-thirds of an array, then sorts the first two-thirds again.";
      break;
    case "gnomeSort":
      algorithmInfo = "Gnome Sort: Gnome sort is a simple sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order.";
      break;
    case "cocktailShakerSort":
      algorithmInfo = "Cocktail Shaker Sort: Cocktail shaker sort is a variation of the bubble sort algorithm that sorts the list in both directions, repeatedly.";
      break;
    case "introsort":
      algorithmInfo = "Introsort: Introsort is a hybrid sorting algorithm that provides both fast average time complexity and (asymptotically) optimal worst-case time complexity.";
      break;
    case "oddEvenSort":
      algorithmInfo = "Odd-Even Sort: Odd-even sort, or brick sort, is a parallel version of bubble sort where the list is divided into odd and even elements, and the two sublists are sorted independently.";
      break;
    // Add cases for other sorting algorithms

    default:
      algorithmInfo = "No information available for this algorithm.";
      break;
  }

  infoDiv.innerText = algorithmInfo;
}



function play() {
  moves = bubbleSort(array);
}

const bubbleSortButton = document.getElementById("bubbleSortButton");
const heapSortButton = document.getElementById("heapSortButton");

bubbleSortButton.addEventListener("click", () => {
  moves = bubbleSort(array.slice());
  updateAlgorithmInfo("bubbleSort");
  animate();
});

heapSortButton.addEventListener("click", () => {
  moves = heapSort(array.slice());
  updateAlgorithmInfo("heapSort");
  animate();
});
const cycleSortButton = document.getElementById("cycleSortButton");
cycleSortButton.addEventListener("click", triggerCycleSort);

const selectionSortButton = document.getElementById("selectionSortButton");
selectionSortButton.addEventListener("click", triggerSelectionSort);

const combSortButton = document.getElementById("combSortButton");
combSortButton.addEventListener("click", triggerCombSort);

const stoogeSortButton = document.getElementById("stoogeSortButton");
stoogeSortButton.addEventListener("click", triggerStoogeSort);

const gnomeSortButton = document.getElementById("gnomeSortButton");
gnomeSortButton.addEventListener("click", triggerGnomeSort);

const cocktailShakerSortButton = document.getElementById("cocktailShakerSortButton");
cocktailShakerSortButton.addEventListener("click", triggerCocktailShakerSort);

const introsortButton = document.getElementById("introsortButton");
introsortButton.addEventListener("click", triggerIntrosort);

const oddEvenSortButton = document.getElementById("oddEvenSortButton");
oddEvenSortButton.addEventListener("click", triggerOddEvenSort);

animate();

// This is Odd Even Sort
function oddEvenSort(array, moves) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < array.length - 1; i += 2) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                moves.push({ indices: [i, i + 1], swap: true });
                sorted = false;
            } else {
                moves.push({ indices: [i, i + 1], swap: false });
            }
        }

        for (let i = 0; i < array.length - 1; i += 2) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                moves.push({ indices: [i, i + 1], swap: true });
                sorted = false;
            } else {
                moves.push({ indices: [i, i + 1], swap: false });
            }
        }
    }
}

function triggerOddEvenSort() {
    moves = [];
    oddEvenSort(array.slice(), moves);
    updateAlgorithmInfo("oddEvenSort");
    animate();
}



// This is Intro Sort
function introsort(array, moves) {
    const maxDepth = Math.ceil(Math.log2(array.length) * 2);
    introsortRecursive(array, 0, array.length - 1, maxDepth, moves);
}

function introsortRecursive(array, low, high, depthLimit, moves) {
    if (low < high) {
        if (depthLimit === 0) {
            heapsort(array, low, high, moves);
        } else {
            const partitionIndex = partition(array, low, high, moves);
            introsortRecursive(array, low, partitionIndex, depthLimit - 1, moves);
            introsortRecursive(array, partitionIndex + 1, high, depthLimit - 1, moves);
        }
    }
}

function partition(array, low, high, moves) {
    const pivot = array[Math.floor((low + high) / 2)];
    let i = low - 1;
    let j = high + 1;

    while (true) {
        do {
            i++;
        } while (array[i] < pivot);

        do {
            j--;
        } while (array[j] > pivot);

        if (i >= j) {
            return j;
        }

        [array[i], array[j]] = [array[j], array[i]];
        moves.push({ indices: [i, j], swap: true });
    }
}

function heapsort(array, low, high, moves) {
    buildHeap(array, low, high, moves);
    for (let i = high; i > low; i--) {
        [array[i], array[low]] = [array[low], array[i]];
        moves.push({ indices: [i, low], swap: true });
        heapify(array, low, i - 1, 0, moves);
    }
}

function buildHeap(array, low, high, moves) {
    const n = high - low + 1;
    for (let i = low + Math.floor(n / 2) - 1; i >= low; i--) {
        heapify(array, low, high, i, moves);
    }
}

function heapify(array, low, high, i, moves) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left <= high && array[left] > array[largest]) {
        largest = left;
    }

    if (right <= high && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        moves.push({ indices: [i, largest], swap: true });
        heapify(array, low, high, largest, moves);
    } else {
        moves.push({ indices: [i, largest], swap: false });
    }
}

function triggerIntrosort() {
    init();
    moves = [];
    introsort(array.slice(), moves);
    updateAlgorithmInfo("introsort");
    animate();
}


// This is Cock Tail Shaker Sort
function cocktailShakerSort(array, moves) {
    let swapped = true;
    let start = 0;
    let end = array.length - 1;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                moves.push({ indices: [i, i + 1], swap: true });
                swapped = true;
            } else {
                moves.push({ indices: [i, i + 1], swap: false });
            }
        }

        if (!swapped) {
            break;
        }

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                moves.push({ indices: [i, i + 1], swap: true });
                swapped = true;
            } else {
                moves.push({ indices: [i, i + 1], swap: false });
            }
        }

        start++;
    }

    return array;
}

function triggerCocktailShakerSort() {
    moves = [];
    cocktailShakerSort(array.slice(), moves);
    updateAlgorithmInfo("cocktailShakerSort");
    animate();
}



// This is Gnome sort
function gnomeSort(array, moves) {
    let index = 0;

    while (index < array.length) {
        if (index === 0 || array[index] >= array[index - 1]) {
            index++;
        } else {
            [array[index], array[index - 1]] = [array[index - 1], array[index]];
            moves.push({ indices: [index - 1, index], swap: true });
            index--;
        }
    }

    return array;
}

function triggerGnomeSort() {
    moves = [];
    gnomeSort(array.slice(), moves);
    updateAlgorithmInfo("gnomeSort");
    animate();
}

// This is Smooth sort 
function stoogeSort(array, start, end, moves) {
    if (array[start] > array[end]) {
        [array[start], array[end]] = [array[end], array[start]];
        moves.push({ indices: [start, end], swap: true });
    }

    if (end - start + 1 > 2) {
        const third = Math.floor((end - start + 1) / 3);

        stoogeSort(array, start, end - third, moves);
        stoogeSort(array, start + third, end, moves);
        stoogeSort(array, start, end - third, moves);
    }

    return array;
}

function triggerStoogeSort() {
    moves = [];
    stoogeSort(array.slice(), 0, array.length - 1, moves);
    updateAlgorithmInfo("stoogeSort");
    animate();
}


// This is Comb sort 
function getNextGap(gap) {
    gap = Math.floor(gap / 1.3);
    if (gap < 1) {
        return 1;
    }
    return gap;
}

function combSort(array) {
    const moves = [];
    let n = array.length;
    let gap = n;

    let swapped = true;

    while (gap !== 1 || swapped) {
        gap = getNextGap(gap);

        swapped = false;

        for (let i = 0; i < n - gap; i++) {
            const j = i + gap;
            if (array[i] > array[j]) {
                [array[i], array[j]] = [array[j], array[i]];
                moves.push({ indices: [i, j], swap: true });
                swapped = true;
            } else {
                moves.push({ indices: [i, j], swap: false });
            }
        }
    }

    return moves;
}

function triggerCombSort() {
    moves = combSort(array.slice());
    updateAlgorithmInfo("combSort");
    animate();
}


// This is Selection sort 
function selectionSort(array) {
    const moves = [];

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            moves.push({ indices: [i, minIndex], swap: true });
        } else {
            moves.push({ indices: [i, minIndex], swap: false });
        }
    }

    return moves;
}

function triggerSelectionSort() {
    moves = selectionSort(array.slice());
    updateAlgorithmInfo("selectionSort");
    animate();
}

// this is Cycle sort
function cycleSort(array) {
  const moves = [];

  for (let cycleStart = 0; cycleStart < array.length - 1; cycleStart++) {
    let item = array[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < array.length; i++) {
      if (array[i] < item) {
        pos++;
      }
    }

    if (pos === cycleStart) {
      continue;
    }

    while (item === array[pos]) {
      pos++;
    }

    [item, array[pos]] = [array[pos], item];
    moves.push({ indices: [cycleStart, pos], swap: true });

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < array.length; i++) {
        if (array[i] < item) {
          pos++;
        }
      }

      while (item === array[pos]) {
        pos++;
      }

      [item, array[pos]] = [array[pos], item];
      moves.push({ indices: [cycleStart, pos], swap: true });
    }
  }

  return moves;
}

function triggerCycleSort() {
  moves = cycleSort(array.slice());
  updateAlgorithmInfo("cycleSort");
  animate();
}

// this is heap sort
function heapify(array, n, i, moves) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    moves.push({ indices: [i, largest], swap: true });
    heapify(array, n, largest, moves);
  } else {
    moves.push({ indices: [i, largest], swap: false });
  }
}

function buildHeap(array, moves) {
  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, moves);
  }
}

function heapSort(array) {
  const moves = [];
  const n = array.length;

  buildHeap(array, moves);

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    moves.push({ indices: [0, i], swap: true });
    heapify(array, i, 0, moves);
  }

  return moves;
}

// This is Bubble sort
function bubbleSort(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        moves.push({ indices: [i - 1, i], swap: true });
      } else {
        moves.push({ indices: [i - 1, i], swap: false });
      }
    }
  } while (swapped);
  return moves;
}

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  let changed = false;
  for (let i = 0; i < cols.length; i++) {
    changed = cols[i].draw(ctx) || changed;
  }

  if (!changed && moves.length > 0) {
    const move = moves.shift();
    const [i, j] = move.indices;
    const waveformType = move.swap ? "square" : "sine";
    playNote(cols[i].height + cols[j].height, waveformType);
    if (move.swap) {
      cols[i].moveTo(cols[j]);
      cols[j].moveTo(cols[i], -1);
      [cols[i], cols[j]] = [cols[j], cols[i]];
    } else {
      cols[i].jump();
      cols[j].jump();
    }
  }

  requestAnimationFrame(animate);
}
