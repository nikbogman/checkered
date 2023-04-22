<script>
    import { onDestroy, onMount } from "svelte";
    import GiAbstract080 from "svelte-icons/gi/GiAbstract080.svelte";

    let tiles = [];
    let measurements = {
        colCount: 0,
        rowCount: 0,
        tileSize: 0,
    };

    const min = 9;
    const max = 14;

    function layout() {
        const surface = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };

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

        // add one additional column and two rows
        // in case of offseting the grid position when fixed, for more unfixed pattern

        measurements.colCount = columnCount + 1;
        measurements.tileSize = areaWidth / columnCount;
        measurements.rowCount =
            Math.floor(surface.height / measurements.tileSize) + 2;

        tiles = new Array(measurements.rowCount).fill(
            new Array(measurements.colCount)
        );
    }

    onMount(() => {
        layout();
        window.addEventListener("resize", layout);
    });

    onDestroy(() => window.removeEventListener("resize", layout));
</script>

<div
    style={`
        top: -${measurements.tileSize / 2}px;
        left: -${measurements.tileSize / 2}px;
        position: fixed;
        display: grid;
        grid-template-columns:  repeat(${measurements.colCount}, ${
        measurements.tileSize
    }px);
        grid-template-rows:  repeat(${measurements.rowCount}, ${
        measurements.tileSize
    }px);
    `}
>
    {#each tiles as row, y}
        {#each row as _, x}
            {#if (x + y) % 2 === 0}
                <GiAbstract080 />
            {:else}
                <div />
            {/if}
        {/each}
    {/each}
</div>
