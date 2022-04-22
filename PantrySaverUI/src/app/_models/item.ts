export interface Item {
    itemId: string,
    name: string,
    barcodeFormats: string | null,
    category: string | null,
    manufacturer: string | null,
    imageUrl: string | null,
    description: string | null,
    isCustom: boolean,
    userId: string | null
}