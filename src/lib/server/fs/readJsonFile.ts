import { readTextFile } from "./readTextFile.js"

export const readJsonFile = async (path: string) => {
    return JSON.parse(await readTextFile(path))
}
