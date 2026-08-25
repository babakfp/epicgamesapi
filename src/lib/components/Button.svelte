<script lang="ts">
    import type { Snippet } from "svelte"

    interface Props {
        href?: string | undefined
        target?: HTMLAnchorElement["target"] | undefined
        variant: "primary" | "secondary" | "ghost"
        disabled?: boolean
        class?: string
        children: Snippet
    }

    let {
        href,
        target,
        variant,
        disabled = false,
        class: className = "",
        children,
    }: Props = $props()
</script>

<a
    class={[
        className,
        "hover-visible:text-white flex justify-center rounded-md border-2 px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variant !== "ghost" && "border-transparent",
        variant === "primary" &&
            "bg-emerald-700 text-emerald-50 hover:bg-emerald-600 focus-visible:outline-emerald-700",
        variant === "secondary" &&
            "bg-gray-800 hover:bg-gray-700 focus-visible:outline-gray-800",
        variant === "ghost" && "border-gray-800 focus-visible:outline-gray-800",
        disabled && "pointer-events-none",
    ]}
    {href}
    {target}
    aria-disabled={disabled}
>
    <span class={disabled ? "opacity-25" : ""}>
        {@render children()}
    </span>
</a>
