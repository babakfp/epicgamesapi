<script lang="ts">
    import { page } from "$app/stores"
</script>

<nav
    class="fixed top-2 z-50 rounded-full text-xs shadow
        {$page.url.pathname === '/docs' ? 'right-2' : 'inset-x-center'}
        {$page.url.pathname.startsWith('/products')
        ? 'bg-base-200'
        : 'backdrop-blur'}
    "
>
    <ul class="flex justify-center">
        <li>
            <a
                class="flex h-8 items-center px-2 pl-4 hover:text-white"
                href="/"
            >
                Home
            </a>
        </li>
        <li>
            <a class="flex h-8 items-center px-2 hover:text-white" href="/docs">
                Documentation
            </a>
        </li>
        <li>
            <a
                class="flex h-8 items-center px-2 pr-4 hover:text-white"
                href="/products"
            >
                Demo
            </a>
        </li>
    </ul>
</nav>
