import * as v from "valibot"
import { readJsonFileCwd } from "@/lib/server/fs/readJsonFileCwd.js"
import type { Products } from "@/lib/apiDataTypes.js"
import lunr from "lunr"

const SearchParamsSchema = v.object(
    {
        search: v.optional(v.string()),
        minPrice: v.optional(v.coerce(v.number(), Number)),
        maxPrice: v.optional(v.coerce(v.number(), Number)),
        minDiscount: v.optional(v.coerce(v.number(), Number)),
        maxDiscount: v.optional(v.coerce(v.number(), Number)),
        tagIds: v.optional(
            v.transform(v.string(), (input) => input.split(",").map(Number))
        ),
        start: v.optional(v.coerce(v.number(), Number), 0),
        limit: v.optional(v.coerce(v.number([v.maxValue(100)]), Number), 10),
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

        const products: Products = await readJsonFileCwd("/data/products.json")

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
            return new Response(error.message, { status: 400 })
        }
        throw error
    }
}
