import { bundledLanguages, bundledThemes, getHighlighter } from "shiki"
import beardedThemeArcEolstorm from "@/lib/docs/bearded-theme-arc-eolstorm.json?raw"

const highlighter = await getHighlighter({
    themes: [
        ...Object.keys(bundledThemes),
        JSON.parse(beardedThemeArcEolstorm),
    ],
    langs: Object.keys(bundledLanguages),
})

export const codeToHtml = (code: string) => {
    const html = highlighter.codeToHtml(code, {
        lang: "md",
        theme: "BeardedTheme Arc-eolstorm",
    })

    return html
}
