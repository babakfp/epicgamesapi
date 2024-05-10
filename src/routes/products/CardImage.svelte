<script lang="ts">
    import { onMount } from "svelte"

    export let src: string
    export let alt: string
    export let lazy = true
    export let className = ""
    export let placeholder = false
    export let aspectType: "tall" | "wide" = "tall"

    let isLoaded = false

    onMount(() => (isLoaded = true))
</script>

{#if placeholder}
    <div class="rounded aspect-[3/4] bg-gray-700 {className}" />
{:else}
    <img
        class="rounded w-full bg-gray-700 {className}
            {aspectType === 'tall' ? 'aspect-[3/4]' : 'aspect-video'}
            {!isLoaded ? 'animate-pulse' : ''}
        "
        loading={lazy ? "lazy" : undefined}
        {src}
        {alt}
        on:load={() => (isLoaded = true)}
    />
{/if}
