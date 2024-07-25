<script lang="ts">
    import type Products from "$lib/data/products.json"
    import CardImage from "./CardImage.svelte"
    import CardPrice from "./CardPrice.svelte"

    export let product: (typeof Products)[number]
</script>

<a class="group grid gap-2" href="/products/{product.id}">
    <CardImage
        className="supports-hover:group-hover:-translate-y-2 supports-hover:duration-200"
        aspectRatio="tall"
        src={product.image.tall}
        alt={product.title}
        loading="lazy"
    />

    <h3 class="truncate text-sm font-semibold text-white" title={product.title}>
        {product.title}
    </h3>

    <CardPrice
        className="text-xs supports-hover:opacity-0 will-change-transform supports-hover:duration-200 supports-hover:translate-y-4 supports-hover:group-hover:translate-y-0 supports-hover:group-hover:opacity-100"
        price={product.price}
        discount={product.discount}
    />
</a>
