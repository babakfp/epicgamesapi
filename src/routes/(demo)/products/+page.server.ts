import { error } from "@sveltejs/kit"
import type Products from "$lib/data/products.json"

type Data = {
    data: typeof Products
    pagination: {
        start: number
        limit: number
        total: number
    }
}

export const load = async ({ fetch, url }) => {
    const res = await fetch(`/api/products${url.search}`)
    if (!res.ok) return error(res.status, await res.text())
    const data: Data = await res.json()
    return { products: data.data, pagination: data.pagination }
}
