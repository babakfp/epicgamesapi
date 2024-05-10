<script lang="ts">
    import { page } from "$app/stores"
    import Card from "./Card.svelte"

    export let data

    $: canGoBack = data.pagination.start > 0
    $: canGoForward =
        data.pagination.start + data.pagination.limit < data.pagination.total

    $: totalPages = Math.ceil(data.pagination.total / data.pagination.limit)
    $: currentPageNumber =
        Math.ceil(data.pagination.start / data.pagination.limit) + 1
</script>

<ul
    class="grid w-full grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-x-4 gap-y-6"
>
    {#each data.products as product}
        <li>
            <Card {product} />
        </li>
    {/each}
</ul>

<div class="join sticky bottom-4 mt-16 bg-base-100">
    <a
        class="join-item btn text-white
                {!canGoBack ? 'btn-disabled' : ''}
            "
        href="{$page.url.pathname}?start={data.pagination.start -
            data.pagination.limit}"
    >
        Previous
    </a>
    <div class="join-item btn btn-disabled">
        {currentPageNumber}/{totalPages}
    </div>
    <a
        class="join-item btn text-white
                {!canGoForward ? 'btn-disabled' : ''}
            "
        href="{$page.url.pathname}?start={data.pagination.start +
            data.pagination.limit}"
    >
        Next
    </a>
</div>
