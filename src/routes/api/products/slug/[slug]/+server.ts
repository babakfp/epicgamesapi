import * as v from "valibot"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd.js"
import type { Products } from "@/lib/apiDataTypes.js"

const ParamsSchema = v.object({ slug: v.string() }, v.never())

export const GET = async ({ params }) => {
    try {
        const { slug } = v.parse(ParamsSchema, params)
        const products: Products = await readJsonFileCwd("/data/products.json")
        const product = products.find((p) => p.slug === slug)
        if (!product) {
            return new Response(undefined, {
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
