<script lang="ts">
    export let href: string | undefined = undefined
    export let target: HTMLAnchorElement["target"] | undefined = undefined
    export let variant: "primary" | "secondary" | "ghost"
    export let disabled = false
    export let className = ""
    export { className as class }
</script>

<a
    {href}
    {target}
    class="{className} flex justify-center rounded-md border-2 px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hocus-visible:text-white
        {variant !== 'ghost' ? 'border-transparent' : ''}
        {variant === 'primary'
        ? 'bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600'
        : ''}
        {variant === 'secondary'
        ? 'bg-gray-800 hover:bg-gray-700 focus-visible:outline-gray-800'
        : ''}
        {variant === 'ghost'
        ? 'border-gray-800 focus-visible:outline-gray-800'
        : ''}
        {disabled ? 'pointer-events-none' : ''}
    "
    aria-disabled={disabled}
>
    <span class={disabled ? "opacity-25" : ""}>
        <slot />
    </span>
</a>
