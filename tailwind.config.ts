import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"
import daisyui from "daisyui"
import { allAddons } from "tailwindcss-addons"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{html,svelte}"],
    theme: {
        extend: {
            screens: {
                xs: "540px",
            },
            colors: {
                gray: colors.zinc,
            },
            fontFamily: {
                sans: ["Recursive", ...defaultTheme.fontFamily.sans],
                mono: ["JetBrainsMono", ...defaultTheme.fontFamily.mono],
            },
        },
        container: {
            center: true,
            padding: "1rem",
        },
    },
    plugins: [daisyui, ...allAddons()],
    daisyui: { logs: false },
} satisfies Config
