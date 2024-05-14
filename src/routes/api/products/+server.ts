import * as v from "valibot"
import lunr from "lunr"
import type { Products } from "@/lib/apiDataTypes.js"
import productsRaw from "@/lib/data/products.json?raw"

const stringOfCommaSeparatedNumbersRegex = /^(\d+,)*\d+$/

const SearchParamsSchema = v.object(
    {
        search: v.optional(v.string()),
        minPrice: v.optional(
            v.coerce(v.number([v.integer(), v.minValue(0)]), Number)
        ),
        maxPrice: v.optional(
            v.coerce(v.number([v.integer(), v.minValue(0)]), Number)
        ),
        minDiscount: v.optional(
            v.coerce(v.number([v.integer(), v.minValue(0)]), Number)
        ),
        maxDiscount: v.optional(
            v.coerce(v.number([v.integer(), v.minValue(0)]), Number)
        ),
        tagIds: v.optional(
            v.transform(
                v.string([v.regex(stringOfCommaSeparatedNumbersRegex)]),
                (input) => {
                    const ids = input.split(",").map(Number)
                    const Schema = v.array(
                        v.number([v.integer(), v.minValue(1)])
                    )
                    const parsedIds = v.parse(Schema, ids)
                    return parsedIds
                }
            )
        ),
        start: v.optional(
            v.coerce(v.number([v.integer(), v.minValue(0)]), Number),
            0
        ),
        limit: v.optional(
            v.coerce(
                v.number([v.integer(), v.minValue(1), v.maxValue(100)]),
                Number
            ),
            10
        ),
    },
    v.never()
)

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

        const products: Products = JSON.parse(productsRaw)

        let results: Products = []

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
                    (tag) => tag.id === Number(result.ref)
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
                tagIds.find((id) => p.tags.includes(id))
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
