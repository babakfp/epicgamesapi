<script lang="ts">
    import Card from "./Card.svelte"

    export let data

    $: canGoBack = data.pagination.start > 0
    $: canGoForward =
        data.pagination.start + data.pagination.limit < data.pagination.total

    $: totalPages = Math.ceil(data.pagination.total / data.pagination.limit)
    $: currentPageNumber =
        Math.ceil(data.pagination.start / data.pagination.limit) + 1
</script>

<svelte:head>
    <title>Products</title>
</svelte:head>

<ul
    class="grid w-full grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-x-4 gap-y-6"
>
    {#each data.products as product}
        <li>
            <Card {product} />
        </li>
    {/each}
</ul>

<nav class="join sticky bottom-4 mt-8">
    <a
        class="join-item no-animation btn text-xs btn-neutral w-24 {!canGoBack
            ? 'btn-disabled'
            : ''}"
        href="/products?start={data.pagination.start - data.pagination.limit}"
    >
        Previous
    </a>
    <div
        class="join-item no-animation btn text-xs pointer-events-none btn-neutral"
    >
        {currentPageNumber}/{totalPages}
    </div>
    <a
        class="join-item no-animation btn text-xs btn-neutral w-24 {!canGoForward
            ? 'btn-disabled'
            : ''}"
        href="/products?start={data.pagination.start + data.pagination.limit}"
    >
        Next
    </a>
</nav>
