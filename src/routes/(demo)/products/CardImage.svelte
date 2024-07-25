<script lang="ts">
    export let src: string
    export let alt: string
    export let loading: HTMLImageElement["loading"] = "eager"
    export let className = ""
    export let placeholder = false
    export let aspectRatio: "tall" | "wide"

    let isLoaded = false
    let isFailedToLoad = false
</script>

<div class="relative overflow-hidden rounded will-change-transform {className}">
    <div
        class="bg-gray-700 {aspectRatio === 'tall'
            ? 'aspect-[3/4]'
            : 'aspect-video'} {!placeholder && !isLoaded && !isFailedToLoad
            ? 'animate-pulse'
            : ''}"
    />

    {#if !placeholder}
        {#if isFailedToLoad}
            <div class="absolute text-center text-xs inset-center">Failed!</div>
        {/if}

        <img
            class="absolute inset-0"
            {src}
            {alt}
            {loading}
            on:load={() => (isLoaded = true)}
            on:error={() => (isFailedToLoad = true)}
        />
    {/if}
</div>
