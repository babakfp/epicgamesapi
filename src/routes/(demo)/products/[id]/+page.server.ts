import { error } from "@sveltejs/kit"
import type Tags from "@/lib/data/tags.json"
import type Products from "@/lib/data/products.json"

export const load = async ({ fetch, params }) => {
    const res = await fetch(`/api/products/id/${params.id}`)

    if (!res.ok) return error(res.status, await res.text())

    const product: (typeof Products)[number] = await res.json()

    const tags = await Promise.all(
        product.tags.map(
            async (id) =>
                (await fetch(`/api/tags/id/${id}`)).json() as Promise<
                    (typeof Tags)[number]
                >
        )
    )

    return { product, tags }
}
