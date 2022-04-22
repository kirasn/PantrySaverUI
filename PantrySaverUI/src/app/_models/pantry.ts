import { PantryItem } from "./pantryItem"

export interface Pantry {
    pantryId: string,
    pantryName: string,
    location: string
    pantryItems: PantryItem[]
}