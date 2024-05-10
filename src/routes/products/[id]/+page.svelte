<script lang="ts">
    import CardImage from "../CardImage.svelte"
    import CardPrice from "../CardPrice.svelte"

    export let data
</script>

<div class="grid gap-4 self-start">
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
        <h3 class="font-semibold text-3xl text-white">
            {data.product.title}
        </h3>

        <CardPrice
            price={data.product.price}
            discount={data.product.discount}
        />

        <h2 class="font-semibold text-xl mt-4 text-white">Description</h2>

        <p class="text-sm leading-7">{data.product.description}</p>

        {#if data.tags.length}
            <h2 class="font-semibold text-xl mt-4 text-white">Tags</h2>

            <ul class="flex flex-wrap gap-2">
                {#each data.tags as tag}
                    <li>
                        <a
                            class="badge badge-neutral text-xs link"
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
