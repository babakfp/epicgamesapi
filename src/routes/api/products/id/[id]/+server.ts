import * as v from "valibot"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd.js"
import type { Products } from "@/lib/apiDataTypes.js"

const ParamsSchema = v.object({ id: v.coerce(v.number(), Number) }, v.never())

export const GET = async ({ params }) => {
    try {
        const { id } = v.parse(ParamsSchema, params)
        const products: Products = await readJsonFileCwd("/data/products.json")
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
