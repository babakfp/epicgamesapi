<script lang="ts">
    import { page } from "$app/stores"
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

<nav
    class="fixed top-2 rounded-full shadow text-xs z-50
        {$page.url.pathname === '/docs' ? 'right-2' : 'inset-x-center'}
        {$page.url.pathname.startsWith('/products')
        ? 'bg-base-200'
        : 'backdrop-blur'}
    "
>
    <ul class="flex justify-center">
        <li>
            <a class="py-2 px-2 inline-block hover:text-white pl-4" href="/">
                Home
            </a>
        </li>
        <li>
            <a class="py-2 px-2 inline-block hover:text-white" href="/docs">
                Documentation
            </a>
        </li>
        <li>
            <a
                class="py-2 px-2 inline-block hover:text-white pr-4"
                href="/products"
            >
                Demo
            </a>
        </li>
    </ul>
</nav>

<slot />
