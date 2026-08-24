export interface Spot {
    id: string
    name: string
    category: string
    prefecture: string
    postalCode: string
    lat: number
    lng: number
    description: string
    tags: string[]
    image: string
    createdAt: string
}