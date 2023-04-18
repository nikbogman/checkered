<script>
    import { onMount } from "svelte";
    import GiAbstract080 from "svelte-icons/gi/GiAbstract080.svelte";

    function findColumnProps(totalWidth, minCount, maxCount) {
        if (totalWidth === 0) {
            // probably should return something else
            return {
                width: 0,
                count: 0,
                totalWidth: 0,
            };
        }
        for (let count = minCount; count <= maxCount; count++) {
            if (totalWidth % count === 0) {
                return {
                    width: totalWidth / count,
                    count,
                    totalWidth,
                };
            }
        }
        return findColumnProps(totalWidth - 1, minCount, maxCount);
    }

    function findTileProps({ height, width }) {
        const colProps = findColumnProps(width, 9, 16);
        // allway prepare extra tiles
        const rowCount = (Math.floor(height / colProps.width) || 0) + 1;

        return {
            tileSize: colProps.width,
            colCount: colProps.count,
            rowCount,
        };
    }
    let viewportSize = { height: 0, width: 0 };

    onMount(() => {
        viewportSize = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };
        window.addEventListener("resize", () => {
            viewportSize = {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            };
        });
    });

    let surface;
    let tiles;
    $: {
        surface = findTileProps(viewportSize);
        tiles = new Array(surface.rowCount).fill(new Array(surface.colCount));
    }
</script>

<div
    style={`
        display: grid;
        grid-template-columns:  repeat(${surface.colCount}, ${surface.tileSize}px);
        grid-template-rows:  repeat(${surface.rowCount}, ${surface.tileSize}px);
    `}
>
    {#each tiles as row, y}
        {#each row as column, x}
            <!-- just an exapmle for shiffling -->
            {#if (x + y) % 2 === 0}
                <GiAbstract080 />
            {:else}
                <div />
            {/if}
        {/each}
    {/each}
</div>
