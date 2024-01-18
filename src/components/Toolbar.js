import styles from "../styles/Toolbar.module.css";

// Toolbar component
function Toolbar(props) {
    return (
        <div className={styles.toolbar}>
            <span>
                <label htmlFor="algorithmSelect">Algorithm: </label>

                {/* Algorithm dropdown list */}
                <select id="algorithmSelect" value={props.algorithm} onChange={props.onAlgorithmChange}  disabled={props.disabled}>
                    <option value="">--Please choose an algorithm--</option>
                    <option value={props.names.insertionSort}>Insertion sort</option>
                    <option value={props.names.selectionSort}>Selection sort</option>
                    {/* <option value="merge">Merge sort</option> */}
                    <option value={props.names.heapSort}>Heapsort</option>
                    <option value={props.names.quickSort}>Quicksort</option>
                    <option value={props.names.bubbleSort}>Bubble sort</option>
                </select>
            </span>

            <span>
                <label htmlFor="sizeInput">Size: </label>

                {/* Number input */}
                <input id="sizeInput" className={styles.numberInput} type="number" min={props.sizeConfig.min} max={props.sizeConfig.max}
                    value={props.size} onChange={props.onSizeChange} onKeyDown={(e) => {e.preventDefault();}} disabled={props.disabled}
                />

                {/* Range slider input*/}
                <input className={styles.rangeInput} type="range" min={props.sizeConfig.min} max={props.sizeConfig.max} value={props.size}
                    onChange={props.onSizeChange} disabled={props.disabled}
                />
            </span>

            <span>
                <label htmlFor="speedInput">Speed: </label>

                {/* Number input */}
                <input id="speedInput" className={styles.numberInput} type="number" min={props.speedConfig.min} max={props.speedConfig.max}
                    value={props.speed} onChange={props.onSpeedChange} onKeyDown={(e) => {e.preventDefault();}} disabled={props.disabled}
                />

                {/* Range slider input*/}
                <input className={styles.rangeInput} type="range" min={props.speedConfig.min} max={props.speedConfig.max} value={props.speed}
                    onChange={props.onSpeedChange} disabled={props.disabled}
                />
            </span>

            <span>
                {/* Sort button */}
                <button onClick={props.onSortClick} disabled={props.disabled}>Sort</button>

                {/* Randomize button */}
                <button onClick={props.onRandomizeClick} disabled={props.disabled}>Randomize</button>
            </span>
        </div>
    );
}

export default Toolbar;
