<script lang="ts">
    import { onNavigate } from "$app/navigation"
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

<div
    class="container justify-items-center grid content-center items-center pt-8 pb-16 min-h-screen"
>
    <slot />
</div>
