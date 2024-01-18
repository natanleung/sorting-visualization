function animateSwap(blocksRef, speed, setSwapIdPair, leftBlockIndex, rightBlockIndex) {
    // Swap animation of two blocks during sorting

    // Determine left and right block positions
    let leftBlock = blocksRef.current.children[leftBlockIndex];
    let leftBlockPosition = leftBlock.getBoundingClientRect().x;
    let rightBlock = blocksRef.current.children[rightBlockIndex];
    let rightBlockPosition = rightBlock.getBoundingClientRect().x;
    if (leftBlockPosition.x > rightBlockPosition.x) {
        [leftBlock, rightBlock] = [rightBlock, leftBlock];
        [leftBlockPosition, rightBlockPosition] = [rightBlockPosition, leftBlockPosition];
    }

    // Timing options
    const timing = {
        duration: 1000/speed,
        fill: "forwards",
    };

    // Left block moves right
    const leftMove = [
        {transform: `translateX(${rightBlockPosition - leftBlockPosition}px)`}
    ];

    // Right block moves left
    const rightMove = [
        {transform: `translateX(${leftBlockPosition - rightBlockPosition}px)`}
    ];

    // Start both animations simultaneously
    const leftAnimation = leftBlock.animate(leftMove, timing);
    const rightAnimation = rightBlock.animate(rightMove, timing);

    // Restore Blocks state after animation completes
    setSwapIdPair([leftBlockIndex, rightBlockIndex]);
    const animationFinished = Promise.all([leftAnimation.finished, rightAnimation.finished]);
    animationFinished.then(() => {
        setSwapIdPair([]);
        [leftBlock, rightBlock].forEach((block) => {
            block.getAnimations()[0].cancel();
        });
    });

    return animationFinished;
}

export default animateSwap;
