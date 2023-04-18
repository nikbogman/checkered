<script>
    import { onMount } from "svelte";
    import { findTileSize, findRowsCount } from "./functions";
    import GiAbstract080 from "svelte-icons/gi/GiAbstract080.svelte";

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

    let sizing = { count: 0, size: 0, length: 0 };

    let tiles = [];
    let rowsCount = 0;
    $: {
        sizing = findTileSize(viewportSize.width, 9, 14);
        rowsCount = findRowsCount(viewportSize.height, sizing.size) + 1;
        tiles = new Array(rowsCount).fill(new Array(sizing.count));
        console.log(sizing);
        console.log(viewportSize.width);
    }
</script>

<div
    style={`
        display: grid;
        grid-template-columns:  repeat(${sizing.count}, ${sizing.size}px);
        grid-template-rows:  repeat(${rowsCount}, ${sizing.size}px);
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
