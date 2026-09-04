export interface Spot {
    id: string
    name: string
    category: string
    area: string
    postalCode: string
    address: string
    lat: number
    lng: number
    description: string
    tags: string[]
    image: string
    createdAt: string
}

// Omitで除外したい型を宣言（DBで生成された値を使うため）
export type SpotWithoutElm = Omit<Spot, "id" | "createdAt">;