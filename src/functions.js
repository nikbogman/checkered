/**
 * @param {number} lenght
 * @param {number} minCount
 * @param {number} maxCount
 */
export function findTileSize(lenght, minCount, maxCount) {
    if (lenght === 0)
        return { count: 0, size: 0, lenght };
    for (let count = minCount; count <= maxCount; count++) {
        if (lenght % count === 0)
            return { count, size: lenght / count, lenght };
    }
    return findTileSize(lenght - 1, minCount, maxCount);
}

/**
 * @param {number} viewportHeight
 * @param {number} tileSize
 */
export function findRowsCount(viewportHeight, tileSize) {
    let leftover = viewportHeight / tileSize;
    return Math.floor(leftover) || 0;
}
