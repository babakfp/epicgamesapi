import { codeToHtml } from "$lib/docs/codeToHtml.js"
import docs from "$lib/docs/content.md?raw"

export const load = async () => {
    const html = codeToHtml(docs)
    return { html }
}
