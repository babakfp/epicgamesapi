<script lang="ts">
    import type { Snippet } from "svelte"

    interface Props {
        href: string
        children: Snippet
    }

    let { href, children }: Props = $props()
</script>

<li class="group">
    <a
        {href}
        class="flex h-(--header-height) items-center px-2 group-first:pl-4 group-last:pr-4 hover:text-white"
    >
        {@render children()}
    </a>
</li>
