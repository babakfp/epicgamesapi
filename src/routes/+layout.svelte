<script lang="ts">
    import "$lib/app.css"
    import type { Snippet } from "svelte"
    import { LoadingBar } from "svelte-loading-bar"
    import { onNavigate } from "$app/navigation"
    import Header from "$lib/components/Header.svelte"

    interface Props {
        children: Snippet
    }

    let { children }: Props = $props()

    onNavigate((navigation) => {
        if (!(document as any).startViewTransition) return
        return new Promise((resolve) => {
            ;(document as any).startViewTransition(async () => {
                resolve()
                await navigation.complete
            })
        })
    })
</script>

<LoadingBar />

<Header />

{@render children()}
