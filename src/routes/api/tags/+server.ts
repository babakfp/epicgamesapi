import * as v from "valibot"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd.js"
import type { Tags } from "@/lib/apiDataTypes.js"
import lunr from "lunr"

const stringOfCommaSeparatedLowercaseWordsRegex = /^([a-z]+,)*[a-z]+$/

const SearchParamsSchema = v.object(
    {
        search: v.optional(v.string()),
        groupNames: v.optional(
            v.transform(
                v.string([v.regex(stringOfCommaSeparatedLowercaseWordsRegex)]),
                (input) => {
                    const groupNames = input.split(",")
                    const Schema = v.array(v.string())
                    const parsedIds = v.parse(Schema, groupNames)
                    return parsedIds
                }
            )
        ),
    },
    v.never()
)

export const GET = async ({ url }) => {
    try {
        const searchParams = Object.fromEntries(Array.from(url.searchParams))
        const { search, groupNames } = v.parse(SearchParamsSchema, searchParams)

        const tags: Tags = await readJsonFileCwd("/data/tags.json")

        let results: Tags = []

        const idx = lunr(function () {
            this.ref("id")
            this.field("name")

            tags.forEach((tag) => {
                this.add(tag)
            }, this)
        })

        if (search) {
            const searchResult = idx.search(search)

            searchResult.forEach((result) => {
                const foundTag = tags.find(
                    (tag) => tag.id === Number(result.ref)
                )!
                results.push(foundTag)
            })
        }

        if (groupNames?.length) {
            results = results.filter((tag) =>
                groupNames.includes(tag.groupName)
            )
        }

        return new Response(JSON.stringify(results))
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
