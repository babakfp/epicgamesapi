import * as v from "valibot"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd.js"
import type { Tags } from "@/lib/apiDataTypes.js"

const ParamsSchema = v.object({ slug: v.string() }, v.never())

export const GET = async ({ params }) => {
    try {
        const { slug } = v.parse(ParamsSchema, params)
        const tags: Tags = await readJsonFileCwd("/data/tags.json")
        const tag = tags.find((t) => t.slug === slug)
        return new Response(JSON.stringify(tag))
    } catch (error) {
        if (error instanceof v.ValiError) {
            return new Response(error.message, { status: 400 })
        }
        throw error
    }
}
