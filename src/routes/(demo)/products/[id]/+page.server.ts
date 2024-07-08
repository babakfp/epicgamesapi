import { error } from "@sveltejs/kit"
import type Tags from "$lib/data/tags.json"
import type Products from "$lib/data/products.json"

export const load = async ({ fetch, params }) => {
    const productResponse = await fetch(`/api/products/id/${params.id}`)

    if (!productResponse.ok)
        return error(productResponse.status, await productResponse.text())

    const product: (typeof Products)[number] = await productResponse.json()

    const tagsResponse = await fetch("/api/tags")
    if (!tagsResponse.ok)
        return error(tagsResponse.status, await tagsResponse.text())
    const tags: typeof Tags = await tagsResponse.json()
    const productTags = tags.filter((tag) => product.tags.includes(tag.id))

    return { product, tags: productTags }
}
