<script lang="ts">
    import { page } from "$app/stores"
    import NavItem from "$lib/components/NavItem.svelte"

    $: isHome = $page.url.pathname === "/"
    $: isDocs = $page.url.pathname === "/docs"
</script>

<nav class="fixed top-2 z-50 text-xs {isDocs ? 'right-2' : 'inset-x-center'}">
    <ul
        class="flex justify-center rounded-full shadow"
        class:bg-gray-800={!isHome}
    >
        <NavItem href="/" class="pl-4">Home</NavItem>
        <NavItem href="/docs">Documentation</NavItem>
        <NavItem href="/products" class="pr-4">Demo</NavItem>
    </ul>
    <div class="absolute -inset-1 -z-1 rounded-full backdrop-blur"></div>
</nav>
