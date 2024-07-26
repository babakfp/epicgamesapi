import type { Config } from "tailwindcss"
import { allAddons } from "tailwindcss-addons"
import colors from "tailwindcss/colors"
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
                mono: ["Recursive", ...defaultTheme.fontFamily.mono],
            },
        },
        container: {
            center: true,
            padding: "1rem",
        },
    },
    plugins: [...allAddons()],
} satisfies Config
