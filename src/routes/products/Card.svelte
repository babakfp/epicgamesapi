<script lang="ts">
    import type { Product } from "@/lib/apiDataTypes"
    import CardImage from "./CardImage.svelte"
    import CardPrice from "./CardPrice.svelte"

    export let product: Product
</script>

<a class="group grid gap-2" href="/products/{product.id}">
    <CardImage
        className="supports-hover:group-hover:-translate-y-2 supports-hover:duration-200"
        src={product.image.tall}
        alt={product.title}
    />

    <h3 class="text-sm font-semibold text-white">
        {product.title}
    </h3>

    <CardPrice
        className="text-xs supports-hover:opacity-0 supports-hover:duration-200 supports-hover:translate-y-4 supports-hover:group-hover:translate-y-0 supports-hover:group-hover:opacity-100"
        price={product.price}
        discount={product.discount}
    />
</a>
