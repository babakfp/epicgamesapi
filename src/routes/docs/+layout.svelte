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
        @apply p-8 pt-16 pl-2 xs:pl-4 sm:pl-8 overflow-y-auto outline-none font-semibold;
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
        @apply w-8 inline-block mr-4 leading-8 text-right text-white/5 text-sm;
    }
</style>
