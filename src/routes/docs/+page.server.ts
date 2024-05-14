import { bundledLanguages, bundledThemes, getHighlighter } from "shiki"
import { readTextFileCwd } from "@/lib/server/fs/readTextFileCwd"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd"

export const load = async () => {
    const content = await readTextFileCwd("/src/lib/docs/content.md")
    const beardedThemeArcEolstorm = await readJsonFileCwd(
        "/src/lib/docs/bearded-theme-arc-eolstorm.json"
    )

    const highlighter = await getHighlighter({
        themes: [beardedThemeArcEolstorm],
        langs: Object.keys(bundledLanguages),
    })

    const html = highlighter.codeToHtml(content, {
        lang: "md",
        theme: "BeardedTheme Arc-eolstorm",
    })

    return { html }
}
