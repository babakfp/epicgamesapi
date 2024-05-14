import { bundledLanguages, bundledThemes, getHighlighter } from "shiki"
import { readTextFileCwd } from "@/lib/server/fs/readTextFileCwd"

export const load = async () => {
    const content = await readTextFileCwd("/src/routes/docs/content.md")

    const highlighter = await getHighlighter({
        themes: Object.keys(bundledThemes),
        langs: Object.keys(bundledLanguages),
    })

    const html = highlighter.codeToHtml(content, {
        lang: "md",
        theme: "vitesse-dark",
    })

    return { html }
}
