import type Products from "@/lib/data/products.json"

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
    const data: Data = await res.json()
    return { products: data.data, pagination: data.pagination }
}
