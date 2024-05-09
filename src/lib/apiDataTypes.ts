export type Tag = {
    id: number
    name: string
    slug: string
    groupName: string
}

export type Product = {
    id: number
    slug: string
    title: string
    description: string
    image: {
        tall: string
        wide: string
    }
    price: number
    discount: number
    tags: Tag["id"][]
}
