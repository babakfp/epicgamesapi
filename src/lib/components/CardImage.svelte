<script lang="ts">
    import { untrack } from "svelte"

    interface Props {
        src: string
        alt: string
        loading?: HTMLImageElement["loading"]
        className?: string
        placeholder?: boolean
        aspectRatio: "tall" | "wide"
    }

    let {
        src,
        alt,
        loading = "eager",
        className = "",
        placeholder = false,
        aspectRatio,
    }: Props = $props()

    let isLoaded = $state(false)
    let isFailedToLoad = $state(false)

    // reset loading state whenever the src changes
    $effect(() => {
        src // dependency
        untrack(() => {
            isLoaded = false
            isFailedToLoad = false
        })
    })
</script>

<div
    class={[
        "relative overflow-hidden rounded will-change-transform",
        className,
    ]}
>
    <div
        class={[
            "bg-gray-700",
            aspectRatio === "tall" ? "aspect-3/4" : "aspect-video",
            !placeholder && !isLoaded && !isFailedToLoad && "animate-pulse",
        ]}
    ></div>

    {#if !placeholder}
        {#if isFailedToLoad}
            <div class="inset-center absolute text-center text-xs">Failed!</div>
        {:else}
            <img
                class={[
                    "absolute inset-0 transition-opacity duration-200",
                    isLoaded ? "opacity-100" : "opacity-0",
                ]}
                {src}
                {alt}
                {loading}
                onload={() => (isLoaded = true)}
                onerror={() => (isFailedToLoad = true)}
            />
        {/if}
    {/if}
</div>
