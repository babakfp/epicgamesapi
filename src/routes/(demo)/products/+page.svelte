<script lang="ts">
    import Button from "$lib/components/Button.svelte"
    import Card from "$lib/components/Card.svelte"

    let { data } = $props()

    const canGoBack = $derived(data.pagination.start > 0)
    const canGoForward = $derived(
        data.pagination.start + data.pagination.limit < data.pagination.total,
    )

    const totalPages = $derived(
        Math.ceil(data.pagination.total / data.pagination.limit),
    )
    const currentPageNumber = $derived(
        Math.ceil(data.pagination.start / data.pagination.limit) + 1,
    )

    const pagesLeftToGoBack = $derived(currentPageNumber - 1)
    const pagesLeftToGoForward = $derived(totalPages - currentPageNumber)
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

<nav class="sticky bottom-4 mt-8 grid grid-cols-2 gap-2">
    <Button
        href="/products?start={data.pagination.start - data.pagination.limit}"
        class="border-background! border! px-6 text-xs"
        variant="secondary"
        disabled={!canGoBack}
    >
        Previous {pagesLeftToGoBack ? `(${pagesLeftToGoBack})` : ""}
    </Button>
    <Button
        href="/products?start={data.pagination.start + data.pagination.limit}"
        class="border-background! border! px-6 text-xs"
        variant="secondary"
        disabled={!canGoForward}
    >
        Next {pagesLeftToGoForward ? `(${pagesLeftToGoForward})` : ""}
    </Button>
</nav>
