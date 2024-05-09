import { readTextFileCwd } from "@/lib/server/fs/readTextFileCwd.js"

export const GET = async () => {
    const products = await readTextFileCwd("/data/products.json")
    return new Response(products)
}
