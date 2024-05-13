import { error } from "@sveltejs/kit"
import type { Product, Tag } from "@/lib/apiDataTypes.js"

export const load = async ({ fetch, params }) => {
    const res = await fetch(`/api/products/id/${params.id}`)

    if (!res.ok) return error(res.status, res.statusText)

    const product: Product = await res.json()

    const tags = await Promise.all(
        product.tags.map(
            async (id) =>
                (await fetch(`/api/tags/id/${id}`)).json() as Promise<Tag>
        )
    )

    return { product, tags }
}
