import { Pantry } from "./pantry";

export interface PantryOwn {
    id?: number;
    pantryId: string,
    role: string,
    pantry: Pantry
}