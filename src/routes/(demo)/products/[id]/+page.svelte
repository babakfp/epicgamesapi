<script lang="ts">
    import CardImage from "../CardImage.svelte"
    import CardPrice from "../CardPrice.svelte"

    export let data
</script>

<svelte:head>
    <title>{data.product.title}</title>
</svelte:head>

<div class="grid w-full gap-4">
    <CardImage
        className="xs:hidden"
        aspectRatio="tall"
        src={data.product.image.tall}
        alt={data.product.title}
    />

    <CardImage
        className="hidden xs:block"
        aspectRatio="wide"
        src={data.product.image.wide}
        alt={data.product.title}
    />

    <div class="grid gap-4">
        <h3 class="text-3xl font-semibold text-white">
            {data.product.title}
        </h3>

        <CardPrice
            price={data.product.price}
            discount={data.product.discount}
        />

        <h2 class="mt-4 text-xl font-semibold text-white">Description</h2>

        <p class="text-sm leading-7">{data.product.description}</p>

        {#if data.tags.length}
            <h2 class="mt-4 text-xl font-semibold text-white">Tags</h2>

            <ul class="flex flex-wrap gap-2">
                {#each data.tags as tag}
                    <li>
                        <a
                            class="badge link badge-neutral text-xs"
                            href="/products?tagIds={tag.id}"
                        >
                            {tag.name}
                        </a>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
