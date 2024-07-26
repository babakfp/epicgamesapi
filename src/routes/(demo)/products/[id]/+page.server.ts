import { error } from "@sveltejs/kit"
import type Products from "$lib/data/products.json"
import type Tags from "$lib/data/tags.json"

export const load = async ({ fetch, params }) => {
    const prdRes = await fetch(`/api/products/id/${params.id}`)
    if (!prdRes.ok) {
        return error(prdRes.status, prdRes.statusText)
    }
    const product: (typeof Products)[number] = await prdRes.json()

    const tagRes = await fetch("/api/tags")
    if (!tagRes.ok) {
        return error(tagRes.status, tagRes.statusText)
    }
    const tags: typeof Tags = await tagRes.json()
    const prdTags = tags.filter((tag) => product.tags.includes(tag.id))

    return { product, tags: prdTags }
}
