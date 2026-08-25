<script lang="ts">
    import type { Snippet } from "svelte"

    interface Props {
        children: Snippet
    }

    let { children }: Props = $props()
</script>

<div class="mx-auto max-w-(--breakpoint-md)">
    <div
        class="container grid min-h-screen content-center items-center justify-items-center py-16"
    >
        {@render children()}
    </div>
</div>
