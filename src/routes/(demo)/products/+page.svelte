<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Card from "$lib/components/Card.svelte"

    export let data

    $: canGoBack = data.pagination.start > 0
    $: canGoForward =
        data.pagination.start + data.pagination.limit < data.pagination.total

    $: totalPages = Math.ceil(data.pagination.total / data.pagination.limit)
    $: currentPageNumber =
        Math.ceil(data.pagination.start / data.pagination.limit) + 1

    $: pagesLeftToGoBack = currentPageNumber - 1
    $: pagesLeftToGoForward = totalPages - currentPageNumber
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

<nav
    class="sticky bottom-4 mt-8 grid grid-cols-2 gap-2 rounded p-1 backdrop-blur"
>
    <Button
        href="/products?start={data.pagination.start - data.pagination.limit}"
        class="px-6 text-xs"
        variant="secondary"
        disabled={!canGoBack}
    >
        Previous {pagesLeftToGoBack ? `(${pagesLeftToGoBack})` : ""}
    </Button>
    <Button
        href="/products?start={data.pagination.start + data.pagination.limit}"
        class="px-6 text-xs"
        variant="secondary"
        disabled={!canGoForward}
    >
        Next {pagesLeftToGoForward ? `(${pagesLeftToGoForward})` : ""}
    </Button>
</nav>
