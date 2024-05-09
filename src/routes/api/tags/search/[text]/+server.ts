import * as v from "valibot"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd.js"
import type { Tags } from "@/lib/apiDataTypes.js"
import lunr from "lunr"

const ParamsSchema = v.object({ text: v.string() }, v.never())
const SearchParamsSchema = v.object(
    {
        groupNames: v.optional(
            v.transform(v.string(), (input) => input.split(","))
        ),
    },
    v.never()
)

export const GET = async ({ params, url }) => {
    try {
        const { text } = v.parse(ParamsSchema, params)

        const searchParams = Object.fromEntries(Array.from(url.searchParams))
        const { groupNames } = v.parse(SearchParamsSchema, searchParams)

        const tags: Tags = await readJsonFileCwd("/data/tags.json")

        let results: Tags = []

        const idx = lunr(function () {
            this.ref("id")
            this.field("name")

            tags.forEach((tag) => {
                this.add(tag)
            }, this)
        })

        const searchResult = idx.search(text)

        searchResult.forEach((result) => {
            const foundTag = tags.find((tag) => tag.id === Number(result.ref))!
            results.push(foundTag)
        })

        if (groupNames?.length) {
            results = results.filter((tag) =>
                groupNames.includes(tag.groupName)
            )
        }

        return new Response(JSON.stringify(results))
    } catch (error) {
        if (error instanceof v.ValiError) {
            return new Response(error.message, { status: 400 })
        }
        throw error
    }
}
