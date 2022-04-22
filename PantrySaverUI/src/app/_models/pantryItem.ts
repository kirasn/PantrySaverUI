import { Item } from "./item";

export interface PantryItem {
    pantryItemId: string,
    pantryId: string,
    itemId: string,
    quantity: number,
    expiredDate: Date,
    alertQuantity: number,
    alertDate: Date,
    item: Item
}