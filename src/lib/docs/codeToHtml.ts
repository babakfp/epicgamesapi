import { bundledLanguages, bundledThemes, createHighlighter } from "shiki"

const highlighter = await createHighlighter({
    themes: [...Object.keys(bundledThemes)],
    langs: Object.keys(bundledLanguages),
})

export const codeToHtml = (code: string) => {
    const html = highlighter.codeToHtml(code, {
        lang: "md",
        theme: "vitesse-dark",
    })

    return html
}
