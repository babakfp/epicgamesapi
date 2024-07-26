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

export const load = async ({ fetch }) => {
    const res = await fetch("/api/products")
    if (!res.ok) {
        return error(res.status, res.statusText)
    }
    const data: Data = await res.json()
    return {
        products: data.data,
        pagination: data.pagination,
    }
}
