<script lang="ts">
    import { page } from "$app/state"
    import NavItem from "$lib/components/NavItem.svelte"

    const isDocs = $derived(page.url.pathname === "/docs")
</script>

<header class="inset-x-center fixed top-(--header-gap) z-50">
    <nav>
        <ul
            class="border-background flex rounded-full border bg-gray-800 text-xs"
        >
            <NavItem href="/">Home</NavItem>
            <NavItem href="/docs">Documentation</NavItem>
            <NavItem href="/products">Demo</NavItem>
        </ul>
    </nav>
</header>
