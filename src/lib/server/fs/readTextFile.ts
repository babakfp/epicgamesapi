import { readFile } from "node:fs/promises"

export const readTextFile = (path: string) => {
    return readFile(path, "utf-8")
}
