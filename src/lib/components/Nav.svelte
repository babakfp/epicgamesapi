<script lang="ts">
    import { page } from "$app/stores"
    import NavItem from "$lib/components/NavItem.svelte"
</script>

<nav
    class="fixed top-2 z-50 rounded-full text-xs shadow
        {$page.url.pathname === '/docs' ? 'right-2' : 'inset-x-center'}
        {$page.url.pathname.startsWith('/products')
        ? 'bg-gray-800'
        : 'backdrop-blur'}
    "
>
    <ul class="flex justify-center">
        <NavItem href="/" class="pl-4">Home</NavItem>
        <NavItem href="/docs">Documentation</NavItem>
        <NavItem href="/products" class="pr-4">Demo</NavItem>
    </ul>
</nav>
