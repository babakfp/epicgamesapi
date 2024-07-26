import lunr from "lunr"
import * as v from "valibot"
import tags from "$lib/data/tags.json"

const SearchParamsSchema = v.object({
    search: v.optional(v.string()),
    groups: v.optional(
        v.pipe(
            v.string(),
            v.regex(/^([a-z]+,)*[a-z]+$/),
            v.transform((input) => {
                const GroupsSchema = v.array(v.pipe(v.string(), v.minLength(1)))
                return v.parse(GroupsSchema, input.split(","))
            }),
        ),
    ),
})

export const GET = async ({ url }) => {
    try {
        const searchParams = Object.fromEntries(Array.from(url.searchParams))
        const { search, groups } = v.parse(SearchParamsSchema, searchParams)

        let results = tags

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

        if (groups?.length) {
            results = results.filter((tag) => groups.includes(tag.group))
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
