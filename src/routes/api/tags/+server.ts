import lunr from "lunr"
import * as v from "valibot"
import tags from "$lib/data/tags.json"

const stringOfCommaSeparatedLowercaseWordsRegex = /^([a-z]+,)*[a-z]+$/

const SearchParamsSchema = v.object({
    search: v.optional(v.string()),
    groupNames: v.optional(
        v.pipe(
            v.string(),
            v.regex(stringOfCommaSeparatedLowercaseWordsRegex),
            v.transform((input) => {
                const ids = input.split(",")
                const Schema = v.array(v.string())
                const parsedIds = v.parse(Schema, ids)
                return parsedIds
            }),
        ),
    ),
})

export const GET = async ({ url }) => {
    try {
        const searchParams = Object.fromEntries(Array.from(url.searchParams))
        const { search, groupNames } = v.parse(SearchParamsSchema, searchParams)

        let results: typeof tags = []

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
                    (tag) => tag.id === Number(result.ref),
                )!
                results.push(foundTag)
            })
        }

        if (groupNames?.length) {
            results = results.filter((tag) =>
                groupNames.includes(tag.groupName),
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
