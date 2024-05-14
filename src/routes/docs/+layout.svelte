<svelte:head>
    <link
        rel="preload"
        as="font"
        type="font/ttf"
        href="/fonts/JetBrainsMono/JetBrainsMono[wght].ttf"
        crossorigin="anonymous"
    />
    <link
        rel="preload"
        as="font"
        type="font/ttf"
        href="/fonts/JetBrainsMono/JetBrainsMono-Italic[wght].ttf"
        crossorigin="anonymous"
    />
</svelte:head>

<slot />

<style lang="postcss">
    @font-face {
        font-family: "JetBrainsMono";
        font-style: normal;
        font-display: swap;
        font-weight: 100 800;
        src: url("/fonts/JetBrainsMono/JetBrainsMono[wght].ttf")
            format("truetype-variations");
    }

    @font-face {
        font-family: "JetBrainsMono";
        font-style: italic;
        font-display: swap;
        font-weight: 100 800;
        src: url("/fonts/JetBrainsMono/JetBrainsMono-Italic[wght].ttf")
            format("truetype-variations");
    }

    :global(code, kbd, samp, pre) {
        @apply !font-["JetBrainsMono"];
    }

    :global(::selection) {
        @apply bg-gray-700;
    }
    :global(pre) {
        @apply p-8 overflow-y-auto outline-none;
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
        @apply w-8 inline-block mr-4 leading-8 text-right text-gray-800 text-sm;
    }
</style>
