import { readTextFileCwd } from "@/lib/server/fs/readTextFileCwd.js"

export const GET = async () => {
    const tags = await readTextFileCwd("/data/tags.json")
    return new Response(tags)
}
