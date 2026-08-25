<script lang="ts">
    let { data } = $props()
</script>

<svelte:head>
    <title>Documentation</title>
</svelte:head>

{@html data.html}

<style>
    @reference "../../lib/app.css";

    :global(::selection) {
        @apply bg-white/10;
    }

    :global(pre) {
        @apply bg-background! overflow-y-auto pb-8 font-semibold outline-none;
        padding-top: calc(
            var(--header-gap) + var(--header-height) + --spacing(8)
        );
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
    :global(.line::before) {
        content: counter(step);
        counter-increment: step;
        @apply mr-4 inline-block w-8 text-right text-sm leading-8 text-white/10;
    }

    :global(.line) {
        @apply xs:pl-4 px-8 pl-2 sm:pl-8;
    }
</style>
