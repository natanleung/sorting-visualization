import { forwardRef } from "react";

import styles from "../styles/Blocks.module.css";

// Blocks component
const Blocks = forwardRef((props, ref) => {
    return (
        <div ref={ref} className={styles.listblock}>
            {/* Array of blocks to be sorted */}
            {props.blockKeys.slice(0, props.size).map(
                (element, index) => {
                    return (
                    <div className={`${styles.elementblock} ${props.swapIdPair.includes(index) && styles.swapping}`}
                    key={element} style={{height:props.blockHeights[element]+"%"}}/>);
                }
            )}
        </div>
    );
});

export default Blocks;