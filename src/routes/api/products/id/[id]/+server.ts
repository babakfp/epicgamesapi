import * as v from "valibot"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd.js"
import type { Tags } from "@/lib/apiDataTypes.js"

const ParamsSchema = v.object({ id: v.coerce(v.number(), Number) }, v.never())

export const GET = async ({ params }) => {
    try {
        const { id } = v.parse(ParamsSchema, params)
        const products: Tags = await readJsonFileCwd("/data/products.json")
        const product = products.find((p) => p.id === id)
        return new Response(JSON.stringify(product))
    } catch (error) {
        if (error instanceof v.ValiError) {
            return new Response(error.message, { status: 400 })
        }
        throw error
    }
}
