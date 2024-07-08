import * as v from "valibot"
import products from "$lib/data/products.json"

const ParamsSchema = v.object({
    id: v.pipe(v.unknown(), v.transform(Number), v.number()),
})

export const GET = async ({ params }) => {
    try {
        const { id } = v.parse(ParamsSchema, params)
        const product = products.find((p) => p.id === id)
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
