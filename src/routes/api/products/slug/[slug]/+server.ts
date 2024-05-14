import * as v from "valibot"
import type { Products } from "@/lib/apiDataTypes.js"
import productsRaw from "@/lib/data/products.json?raw"

const ParamsSchema = v.object({ slug: v.string() }, v.never())

export const GET = async ({ params }) => {
    try {
        const { slug } = v.parse(ParamsSchema, params)
        const products: Products = JSON.parse(productsRaw)
        const product = products.find((p) => p.slug === slug)
        if (!product) {
            return new Response("Product Not Found", {
                status: 404,
                statusText: "Not Found",
            })
        }
        return new Response(JSON.stringify(product))
    } catch (error) {
        if (error instanceof v.ValiError) {
            return new Response(error.message, {
                status: 400,
                statusText: "Bad Request",
            })
        }
        throw error
    }
}
