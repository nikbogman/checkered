const min = 9;
const max = 14;

function draw() {
    const canvas = document.querySelector("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    let areaWidth = canvas.width;
    let columnCount = min;
    while (columnCount <= max) {
        if (areaWidth % columnCount === 0) break;
        columnCount++;
        if (columnCount === max) {
            columnCount = min;
            areaWidth--;
        }
    }
    columnCount += 1;
    const gridSize = areaWidth / columnCount;
    const rowCount = Math.floor(canvas.height / gridSize) + 1;
    const offset = gridSize / 2;

    const ctx = canvas.getContext("2d");

    const urlParams = new URLSearchParams(window.location.search);
    const src = urlParams.get("src");

    for (let row = 0; row <= rowCount; row++) {
        for (let col = 0; col <= columnCount; col++) {
            const x = col * gridSize - offset;
            const y = row * gridSize - offset;

            if ((row + col) % 2 === 0) {
                if (src) {
                    const image = new Image();
                    image.onload = () => ctx.drawImage(image, x, y, gridSize, gridSize);
                    image.src = src;
                } else {
                    ctx.fillStyle = "black";
                    ctx.fillRect(x, y, gridSize, gridSize);
                }
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(x, y, gridSize, gridSize);
            }
        }
    }
}
window.addEventListener("resize", draw);
window.addEventListener("DOMContentLoaded", draw);
