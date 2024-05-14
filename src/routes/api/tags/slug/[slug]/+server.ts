import * as v from "valibot"
import type { Tags } from "@/lib/apiDataTypes.js"
import tagsRaw from "@/lib/data/tags.json?raw"

const ParamsSchema = v.object({ slug: v.string() }, v.never())

export const GET = async ({ params }) => {
    try {
        const { slug } = v.parse(ParamsSchema, params)
        const tags: Tags = JSON.parse(tagsRaw)
        const tag = tags.find((t) => t.slug === slug)
        if (!tag) {
            return new Response("Tag Not Found", {
                status: 404,
                statusText: "Not Found",
            })
        }
        return new Response(JSON.stringify(tag))
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
