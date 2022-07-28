import { LinkedList } from "linked-list-typescript";
import { LimitOrder } from "./limit_order";

export function matched_size(mathed_orders: LinkedList<LimitOrder>) {
    return mathed_orders.toArray().map(o => o.size).reduce((a, b) => a + b, 0);
}