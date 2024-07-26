<script lang="ts">
    import Button from "$lib/components/Button.svelte"
</script>

<div class="overflow-hidden">
    <div class="relative isolate overflow-hidden px-6 lg:px-8">
        <div
            class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
        >
            <div
                class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 invert sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            />
        </div>
        <div class="mx-auto flex min-h-screen max-w-2xl items-center py-20">
            <div class="text-center">
                <h1
                    class="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                >
                    Epic Games API (Unofficial)
                </h1>
                <p class="mt-6 text-lg leading-8 text-gray-400">
                    A simple and unofficial API for Epic Games. This is a
                    work-in-progress and only some endpoints are implemented.
                </p>
                <div
                    class="mt-10 flex flex-wrap items-center justify-center gap-6"
                >
                    <Button href="/products" variant="primary">
                        Explore the Demo
                    </Button>
                    <Button href="/docs" variant="secondary">
                        Documentation
                    </Button>
                    <Button
                        href="https://github.com/babakfp/epicgamesapi"
                        target="_blank"
                        variant="ghost"
                    >
                        GitHub
                    </Button>
                </div>
            </div>
        </div>
        <div
            class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
        >
            <div
                class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 invert sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            />
        </div>
    </div>
</div>
