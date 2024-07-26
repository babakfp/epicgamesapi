<script lang="ts">
    import { page } from "$app/stores"
    import NavItem from "$lib/components/NavItem.svelte"
</script>

<nav
    class="fixed top-2 z-50 text-xs {$page.url.pathname.startsWith('/docs')
        ? 'right-2'
        : 'inset-x-center'}"
>
    <ul
        class="flex justify-center rounded-full shadow {$page.url.pathname.startsWith(
            '/products',
        ) && 'bg-gray-800'}"
    >
        <NavItem href="/" class="pl-4">Home</NavItem>
        <NavItem href="/docs">Documentation</NavItem>
        <NavItem href="/products" class="pr-4">Demo</NavItem>
    </ul>
    <div class="absolute -inset-1 -z-1 rounded-full backdrop-blur"></div>
</nav>
