import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import Toolbar from "./components/Toolbar.js";
import Blocks from "./components/Blocks.js";
import algorithms from "./algorithms/algorithms.js";
import animateSwap from "./animation/animation.js";

// Root app component
function App() {
    // Configuration variables
    const sizeConfig = {min: 10, max: 100, default: 10};
    const speedConfig = {min: 1, max: 10, default: 1};
    const algorithmNames = Object.entries(algorithms).reduce((a, v) => ({ ...a, [v[0]]: v[0]}), {});

    // State variables
    const [algorithm, setAlgorithm] = useState("");
    /* eslint-disable-next-line no-restricted-globals */
    const [blockKeys, setBlockKeys] = useState([...Array(sizeConfig.max)].map(() => self.crypto.randomUUID()));
    const [blockHeights, setBlockHeights] = useState(generateElements(blockKeys, sizeConfig.default, sizeConfig.max));
    const [size, setSize] = useState(sizeConfig.default);
    const [swapIdPair, setSwapIdPair] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(speedConfig.default);

    // Blocks component reference
    const blocksRef = useRef(null);

    function generateElements(keys, size, maxValue, offset = 0) {
        // Generate a random set of block heights
        const elements = {};
        for (let i = offset; i < offset + size && i < keys.length; i++) {
            elements[keys[i]] = Math.max(Math.floor(Math.random() * maxValue), 1);
            if (i === 0) elements[keys[i]] = 100;
        }
        return elements;
    }

    function selectAlgorithm(e) {
        // Set current algorithm from input
        if (e.target.value) {
            console.log(`Selected algorithm: ${e.target.value}`);
            setAlgorithm(e.target.value);
        }
    }

    function setInputSize(e) {
        // Set array size from input
        console.log(`Set input size: ${e.target.value}`);
        setSize(e.target.value);

        // When removing elements, stale values are left in `blockHeights`
        const changeElements = e.target.value - size;
        if (changeElements > 0) {
            // Add elements
            const newBlockHeights = generateElements(blockKeys, changeElements, sizeConfig.max, size);
            setBlockHeights({...blockHeights, ...newBlockHeights});
        }
    }

    function setInputSpeed(e) {
        // Set sort speed from input
        console.log(`Set sort speed: ${e.target.value}`);
        setSpeed(e.target.value);
    }

    function sortElements() {
        // Sort blocks based on increasing height
        setIsSorting(true);

        let sortingFinished = Promise.resolve();

        // Sort using the current algorithm
        switch (algorithm) {
            case algorithms.insertionSort.name: {
                console.log("Performing insertion sort");
                sortingFinished = algorithms.insertionSort(blockKeys, blockHeights, size, swap);
                break;
            }
            case algorithms.selectionSort.name: {
                console.log("Performing selection sort");
                sortingFinished = algorithms.selectionSort(blockKeys, blockHeights, size, swap);
                break;
            }
            case algorithms.heapSort.name: {
                console.log("Performing heapsort");
                sortingFinished = algorithms.heapSort(blockKeys, blockHeights, size, swap);
                break;
            }
            case algorithms.quickSort.name: {
                console.log("Performing quicksort");
                sortingFinished = algorithms.quickSort(blockKeys, blockHeights, size, swap);
                break;
            }
            case algorithms.bubbleSort.name: {
                console.log("Performing bubble sort");
                sortingFinished = algorithms.bubbleSort(blockKeys, blockHeights, size, swap);
                break;
            }
            default: {
                alert("Unsupported sorting algorithm selected!");
            }
        }

        sortingFinished.then(() => setIsSorting(false));
    }

    function randomizeElements() {
        // Randomize elements
        console.log("Randomizing elements")
        setBlockHeights(generateElements(blockKeys, size, sizeConfig.max));
    }

    function swap(sortedBlockKeys, i, j) {
        if (i === j) return Promise.resolve();

        // Update Blocks array
        [sortedBlockKeys[i], sortedBlockKeys[j]] = [sortedBlockKeys[j], sortedBlockKeys[i]];

        // Swap animation
        const animationFinished = animateSwap(blocksRef, speed, setSwapIdPair, i, j).then(() => {
            // Update Blocks state after animation completes
            flushSync(() => {
                setBlockKeys([...sortedBlockKeys]);
            });
        });
        return animationFinished;
    }

    return (
        <>
            {/* Toolbar component */}
            <Toolbar sizeConfig={sizeConfig} speedConfig={speedConfig} algorithm={algorithm} size={size} speed={speed}
                onAlgorithmChange={selectAlgorithm} onSizeChange={setInputSize} onSpeedChange={setInputSpeed}
                onSortClick={sortElements} onRandomizeClick={randomizeElements} names={algorithmNames} disabled={isSorting}
            />

            {/* Blocks component */}
            <Blocks ref={blocksRef} size={size} blockKeys={blockKeys} blockHeights={blockHeights} swapIdPair={swapIdPair}/>
        </>
    );
}

export default App;
