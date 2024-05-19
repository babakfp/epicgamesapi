<script lang="ts">
    import { onNavigate } from "$app/navigation"
    import { LoadingBar } from "svelte-loading-bar"
    import Nav from "@/lib/Nav.svelte"
    import "../app.pcss"

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

<Nav />

<slot />
