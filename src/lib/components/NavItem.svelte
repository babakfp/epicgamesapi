<script lang="ts">
    export let href: string
    export let className = ""
    export { className as class }
</script>

<li>
    <a {href} class="{className} flex h-8 items-center px-2 hover:text-white">
        <slot />
    </a>
</li>
