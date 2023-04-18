<script>
    import { onMount } from "svelte";
    import GiAbstract080 from "svelte-icons/gi/GiAbstract080.svelte";

    let tiles = [];
    let measurements = {
        colCount: 0,
        rowCount: 0,
        tileSize: 0,
    };

    function layout() {
        const surface = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };
        const min = 9;
        const max = 14;

        let areaWidth = surface.width;
        let columnCount = min;
        while (columnCount <= max) {
            if (areaWidth % columnCount === 0) break;
            columnCount++;
            if (columnCount === max) {
                columnCount = min;
                areaWidth--;
            }
        }
        measurements.colCount = columnCount;
        measurements.tileSize = areaWidth / columnCount;
        measurements.rowCount =
            Math.floor(surface.height / measurements.tileSize) + 1;
        tiles = new Array(measurements.rowCount).fill(new Array(columnCount));
    }

    onMount(() => {
        layout();
        window.addEventListener("resize", layout);
    });
</script>

<div
    style={`
        display: grid;
        grid-template-columns:  repeat(${measurements.colCount}, ${measurements.tileSize}px);
        grid-template-rows:  repeat(${measurements.rowCount}, ${measurements.tileSize}px);
    `}
>
    {#each tiles as row, y}
        {#each row as column, x}
            {#if (x + y) % 2 === 0}
                <GiAbstract080 />
            {:else}
                <div />
            {/if}
        {/each}
    {/each}
</div>
