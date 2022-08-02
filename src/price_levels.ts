import { PriceLevel } from "./price_level";
import { LimitOrder } from "./limit_order";
import BTree  from 'sorted-btree';

export class PriceLevels {
    levels: BTree<number, PriceLevel>

    priceLevel(price: number){
        return this.levels.get(price);
    }
    remove(price: number) {
        this.levels.delete(price);
    }

    constructor(asc: boolean) {
        // Bid levels
        if (asc) {
            this.levels = new BTree<number, PriceLevel>();
        // Ask levels
        } else {
            this.levels = new BTree<number, PriceLevel>(undefined, (a, b) => {return b - a})
        }
    }
    get best(): PriceLevel{
        return this.levels.get(this.levels.maxKey());
    }

    insert(o: LimitOrder) {
        if (this.levels.has(o.price)){
            this.levels.get(o.price).add(o);
        } else {
            const pl = new PriceLevel();
            pl.add(o);
            this.levels.set(o.price, pl);
        }
    }
    
}

