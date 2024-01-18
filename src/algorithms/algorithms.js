async function insertionSort(blockKeys, blockHeights, size, swap) {
    // Description: Add next element in order
    const sortedBlockKeys = [...blockKeys];
    let i = 1;
    while (i < size) {
        let j = i;
        while (j > 0 && blockHeights[sortedBlockKeys[j-1]] > blockHeights[sortedBlockKeys[j]]) {
            // Iterate down until correct index in sorted subarray is found
            await swap(sortedBlockKeys, j-1, j);
            j--;
        }
        i++;
    }
}

async function selectionSort(blockKeys, blockHeights, size, swap) {
    // Description: Add smallest element
    const sortedBlockKeys = [...blockKeys];
    for (let i = 0; i < size-1; i++) {
        let jMin = i;
        for (let j = i+1; j < size; j++) {
            if (blockHeights[sortedBlockKeys[j]] < blockHeights[sortedBlockKeys[jMin]]) {
                // Determine smallest element of unsorted subarray
                jMin = j;
            }
        }

        if (jMin !== i) {
            // Add smallest element to sorted subarray
            await swap(sortedBlockKeys, i, jMin);
        }
    }
}

async function heapSort(blockKeys, blockHeights, size, swap) {
    // Description: Maintain and pop from max-heap
    const sortedBlockKeys = [...blockKeys];
    const leftChild = (i) => 2*i + 1;

    let left = Math.floor(size/2);
    let right = size;
    while (right > 1) {
        if (left > 0) {
            // heapify (construct max-heap structure)
            left--;
        }
        else {
            // siftDown (insert new unsorted element into max-heap structure)
            // Pop root (greatest element) into sorted subarray
            right--;
            await swap(sortedBlockKeys, right, 0);
        }

        let root = left;
        while (leftChild(root) < right) {
            let child = leftChild(root);
            if (child+1 < right && blockHeights[sortedBlockKeys[child]] < blockHeights[sortedBlockKeys[child+1]]) {
                // If right child is greater, swap with root instead of left child
                child++;
            }

            if (blockHeights[sortedBlockKeys[root]] < blockHeights[sortedBlockKeys[child]]) {
                // Iteratively fix max-heap structure
                await swap(sortedBlockKeys, root, child);
                root = child;
            }
            else {
                // Root is greater than its children
                break;
            }
        }
    }
}

async function quickSort(blockKeys, blockHeights, size, swap) {
    // Description: Partition elements based on pivot

    const sort = async (sortedBlockKeys, blockHeights, left, right) => {
        if (left >= right || left < 0) {
            // One element is trivially sorted
            return;
        }

        // Partition the subarray
        const p = await partition(sortedBlockKeys, blockHeights, left, right);

        // Recursively sort the unsorted partitions
        await sort(sortedBlockKeys, blockHeights, left, p-1);
        await sort(sortedBlockKeys, blockHeights, p+1, right);
    };

    const partition = async (sortedBlockKeys, blockHeights, left, right) => {
        // Lomuto partition scheme (choose last element as pivot)
        const pivot = blockHeights[sortedBlockKeys[right]];

        let i = left-1;
        for (let j = left; j < right; j++) {
            if (blockHeights[sortedBlockKeys[j]] <= pivot) {
                // Move lesser elements to left of the pivot
                i++;
                await swap(sortedBlockKeys, i, j);
            }
        }

        // Move the pivot to between the two partitions
        i++;
        await swap(sortedBlockKeys, i, right);
        return i;
    };

    const sortedBlockKeys = [...blockKeys];
    await sort(sortedBlockKeys, blockHeights, 0, size-1);

}

async function bubbleSort(blockKeys, blockHeights, size, swap) {
    // Description: Bubble largest element up
    const sortedBlockKeys = [...blockKeys];
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 1; i < size; i++) {
            if (blockHeights[sortedBlockKeys[i]] < blockHeights[sortedBlockKeys[i-1]]) {
                swapped = true;
                // Bubble up greatest element into sorted subarray
                await swap(sortedBlockKeys, i, i-1);
            }
        }
        size--;
    }
}

const algorithms = {insertionSort, selectionSort, heapSort, quickSort, bubbleSort};

export default algorithms;
