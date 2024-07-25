import lunr from "lunr"
import * as v from "valibot"
import products from "$lib/data/products.json"

const stringOfCommaSeparatedNumbersRegex = /^(\d+,)*\d+$/

const SearchParamsSchema = v.object({
    search: v.optional(v.string()),
    minPrice: v.optional(
        v.pipe(v.unknown(), v.transform(Number), v.integer(), v.minValue(0)),
    ),
    maxPrice: v.optional(
        v.pipe(v.unknown(), v.transform(Number), v.integer(), v.minValue(0)),
    ),
    minDiscount: v.optional(
        v.pipe(v.unknown(), v.transform(Number), v.integer(), v.minValue(0)),
    ),
    maxDiscount: v.optional(
        v.pipe(v.unknown(), v.transform(Number), v.integer(), v.minValue(0)),
    ),
    tagIds: v.optional(
        v.pipe(
            v.string(),
            v.regex(stringOfCommaSeparatedNumbersRegex),
            v.transform((input) => {
                const ids = input.split(",")
                const Schema = v.array(
                    v.pipe(
                        v.unknown(),
                        v.transform(Number),
                        v.integer(),
                        v.minValue(1),
                    ),
                )
                const parsedIds = v.parse(Schema, ids)
                return parsedIds
            }),
        ),
    ),
    start: v.optional(
        v.pipe(v.unknown(), v.transform(Number), v.integer(), v.minValue(0)),
        0,
    ),
    limit: v.optional(
        v.pipe(
            v.unknown(),
            v.transform(Number),
            v.integer(),
            v.minValue(1),
            v.maxValue(100),
        ),
        10,
    ),
})

export const GET = async ({ url }) => {
    try {
        const searchParams = Object.fromEntries(Array.from(url.searchParams))
        const {
            search,
            minPrice,
            maxPrice,
            minDiscount,
            maxDiscount,
            tagIds,
            start,
            limit,
        } = v.parse(SearchParamsSchema, searchParams)

        let results: typeof products = []

        if (search) {
            const idx = lunr(function () {
                this.ref("id")
                this.field("title")
                this.field("description")

                products.forEach((tag) => {
                    this.add(tag)
                }, this)
            })

            const searchResult = idx.search(search)

            searchResult.forEach((result) => {
                const foundTag = products.find(
                    (tag) => tag.id === Number(result.ref),
                )!
                results.push(foundTag)
            })
        } else {
            results = products
        }

        if (typeof minPrice === "number") {
            results = results.filter((p) => p.price >= minPrice)
        }
        if (typeof maxPrice === "number") {
            results = results.filter((p) => p.price <= maxPrice)
        }
        if (typeof minDiscount === "number") {
            results = results.filter((p) => p.discount >= minDiscount)
        }
        if (typeof maxDiscount === "number") {
            results = results.filter((p) => p.discount <= maxDiscount)
        }
        if (tagIds?.length) {
            results = results.filter((p) =>
                tagIds.find((id) => p.tags.includes(id)),
            )
        }

        results = results.slice(start, start + limit)

        const returnValue = {
            data: results,
            pagination: {
                start,
                limit,
                total: products.length,
            },
        }

        return new Response(JSON.stringify(returnValue))
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
