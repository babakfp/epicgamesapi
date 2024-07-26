<script lang="ts">
    import { LoadingBar } from "svelte-loading-bar"
    import { onNavigate } from "$app/navigation"
    import Nav from "$lib/components/Nav.svelte"
    import "$lib/app.css"

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
