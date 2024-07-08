import docs from "$lib/docs/content.md?raw"
import { codeToHtml } from "$lib/docs/codeToHtml.js"

export const load = async () => {
    const html = codeToHtml(docs)
    return { html }
}
