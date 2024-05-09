import { join } from "node:path"
import { readTextFile } from "./readTextFile.js"

export const readTextFileCwd = async (path: string) => {
    return await readTextFile(join(process.cwd(), path))
}
