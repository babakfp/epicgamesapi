<script lang="ts">
    import { page } from "$app/stores"
</script>

<svelte:head>
    <title>Error {$page.status}</title>
</svelte:head>

<h1 class="font-bold text-white text-6xl">
    {$page.status}
</h1>

<p class="mt-2 text-lg text-gray-400">
    {$page.error?.message}
</p>
