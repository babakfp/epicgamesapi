import { join } from "node:path"
import { readJsonFile } from "./readJsonFile.js"

export const readJsonFileCwd = async (path: string) => {
    return await readJsonFile(join(process.cwd(), path))
}
