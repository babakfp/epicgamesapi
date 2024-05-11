<script lang="ts">
    export let price: number
    export let discount: number
    export let className = ""

    const finalPrice = (price - discount) / 100
</script>

<div class={className}>
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
