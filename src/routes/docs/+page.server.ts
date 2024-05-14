import { bundledLanguages, bundledThemes, getHighlighter } from "shiki"
import docs from "@/lib/docs/content.md?raw"
import beardedThemeArcEolstorm from "@/lib/docs/bearded-theme-arc-eolstorm.json?raw"

export const load = async () => {
    const highlighter = await getHighlighter({
        themes: [
            ...Object.keys(bundledThemes),
            JSON.parse(beardedThemeArcEolstorm),
        ],
        langs: Object.keys(bundledLanguages),
    })

    const html = highlighter.codeToHtml(docs, {
        lang: "md",
        theme: "BeardedTheme Arc-eolstorm",
    })

    return { html }
}
