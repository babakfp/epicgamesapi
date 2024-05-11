import type { Products } from "@/lib/apiDataTypes.js"

type Data = {
    data: Products
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
