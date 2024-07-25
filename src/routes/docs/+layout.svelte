<svelte:head>
    <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/JetBrainsMono/JetBrainsMono[wght].woff2"
        crossorigin="anonymous"
    />
    <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/JetBrainsMono/JetBrainsMono-Italic[wght].woff2"
        crossorigin="anonymous"
    />
</svelte:head>

<slot />

<style lang="postcss">
    :global(::selection) {
        @apply bg-white/10;
    }
    :global(pre) {
        @apply overflow-y-auto p-8 pl-2 pt-16 font-semibold outline-none xs:pl-4 sm:pl-8;
    }
    :global(pre),
    :global(pre *) {
        @apply select-text;
    }
    :global(code) {
        @apply block;
        counter-reset: step;
        counter-increment: step 0;
    }
    :global(code .line::before) {
        content: counter(step);
        counter-increment: step;
        @apply mr-4 inline-block w-8 text-right text-sm leading-8 text-white/5;
    }
</style>
