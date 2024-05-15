<script lang="ts">
    import { page } from "$app/stores"
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
            <a
                class="h-8 flex px-2 items-center hover:text-white pl-4"
                href="/"
            >
                Home
            </a>
        </li>
        <li>
            <a class="h-8 flex px-2 items-center hover:text-white" href="/docs">
                Documentation
            </a>
        </li>
        <li>
            <a
                class="h-8 flex px-2 items-center hover:text-white pr-4"
                href="/products"
            >
                Demo
            </a>
        </li>
    </ul>
</nav>
