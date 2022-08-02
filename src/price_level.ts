import { LinkedList } from 'linked-list-typescript';
import { LimitOrder } from './limit_order';

export class PriceLevel {
    ol = new LinkedList<LimitOrder>();
    om = new Map<string, LimitOrder>();
    public size = 0;

    get empty(): boolean {
        return this.length == 0;
    }
    
    get length(): number {
        return this.ol.length;
    }
    get first(): LimitOrder {
        return this.ol.head;
    }

    get price(): number {
        return this.first.price
    }

    add(o: LimitOrder) {
        this.ol.append(o);
        this.size += o.size;
        this.om.set(o.id, o);
    }

    remove(id: string) {
        if (this.om.has(id)) {
            const o = this.om.get(id);
            this.size -= o.size;
            this.om.delete(id);
            if (this.ol.length == 1){
                this.ol.removeHead()
            } else {
                this.ol.remove(o)
            }
        }
    }
}