import * as v from "valibot"
import tags from "@/lib/data/tags.json"

const ParamsSchema = v.object({ id: v.coerce(v.number(), Number) }, v.never())

export const GET = async ({ params }) => {
    try {
        const { id } = v.parse(ParamsSchema, params)
        const tag = tags.find((t) => t.id === id)
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
