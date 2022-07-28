import { LinkedList } from "linked-list-typescript";
import { LimitOrder, OrderSide } from "./limit_order";
import { PriceLevel } from "./price_level";
import { PriceLevels } from "./price_levels";

export class OrderBook {
    ask_levels = new PriceLevels(false);
    bid_levels = new PriceLevels(true);
    orders = new Map<string, LimitOrder>();

    cancel(id: string) {
        let o = this.orders.get(id);
        if (o.side == OrderSide.Buy){
            var levels = this.bid_levels;
        } else {
            var levels = this.ask_levels;
        }
        let pl = levels.priceLevel(o.price);

        pl.remove(id);
        if (pl.empty){
            levels.remove(o.price);
        }
        this.orders.delete(id);
    }
    get ask(): PriceLevel {
        return this.ask_levels.best;
    }

    get bid(): PriceLevel {
        return this.bid_levels.best;
    }

    private more_to_match(o: LimitOrder): boolean {
        if (o.size > 0) {
            if (o.side == OrderSide.Buy && this.ask != undefined) {
                return o.price >= this.ask.price;
            } else if (o.side == OrderSide.Sell && this.bid != undefined) {
                return o.price <= this.bid.price;
            }
        }
        return false;
    }

    place(o: LimitOrder): LinkedList<LimitOrder> {
        var o: LimitOrder = {...o};
        let matched_orders = new LinkedList<LimitOrder>();
        while (this.more_to_match(o)) {
            let pl = this.matching_price_level(o);
            let next_match = pl.first;
            let matched = this.match_order(o, next_match, pl);
            matched_orders.append(matched);
            o.size -= matched.size
        }
        if (o.size > 0) {
            this.insert(o);
        }
        return matched_orders;
    }

    insert(o: LimitOrder) {
        if (o.side == OrderSide.Buy){
            this.bid_levels.insert(o);
        } else {
            this.ask_levels.insert(o);
        }
        this.orders.set(o.id, o);
    }

    private match_order(o: LimitOrder, next_match: LimitOrder, pl: PriceLevel): LimitOrder {
        // More or same on order than next order in book
        if (o.size >= next_match.size) {
            pl.remove(next_match.id);
            this.orders.delete(next_match.id);
            var match: LimitOrder = {...next_match};
        // Less on order than next order in book
        } else if (o.size < next_match.size) {
            var match: LimitOrder = { price: next_match.price, size: o.size, id: next_match.id, side: next_match.side };
            next_match.size -= o.size;
            pl.size -= o.size;
        }

        if (pl.empty) {
            if (next_match.side == OrderSide.Buy) {
                this.bid_levels.remove(match.price);
            } else {
                this.ask_levels.remove(match.price);
            }
        }
        return match;
    }

    private matching_price_level(o: LimitOrder) {
        if (o.side == OrderSide.Buy) {
            return this.ask;
        } else {
            return this.bid;
        }
    }
}