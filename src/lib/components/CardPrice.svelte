<script lang="ts">
    interface Props {
        price: number
        discount: number
        className?: string
    }

    let { price, discount, className = "" }: Props = $props()

    const finalPrice = $derived((price - discount) / 100)
</script>

<div class={[className, "font-mono"]}>
    {#if price !== 0}
        <span class={discount ? "line-through" : ""}>
            ${price / 100}
        </span>
        {#if discount}
            <span>
                {finalPrice === 0 ? "Free" : `$${finalPrice}`}
            </span>
        {/if}
    {:else}
        Free
    {/if}
</div>
