import { LinkedList } from "linked-list-typescript";
import { LimitOrder, OrderSide, OrderBook } from "../src";

function randomInt(min: number, max: number): number {
    const diff = max - min;
    return Math.floor(min + Math.random() * diff) + 1;
}

const maxPrice = 120;
const minPrice = 80;
const maxSize = 10;
const minSize = 1;
const nOrders = 1000000;
let orders = new LinkedList<LimitOrder>();

for (let i = 0; i < nOrders; i++) {
    if (Math.random() > 0.5) {
        var side = OrderSide.Buy;
    } else {
        var side = OrderSide.Sell;
    }
    let price = randomInt(minPrice, maxPrice);
    let size = randomInt(minSize, maxSize);
    let id = i.toString();
    let order: LimitOrder = {price: price, size: size, side: side, id: id}
    orders.append(order)
}

let ob = new OrderBook();

const start = new Date().valueOf();

orders.toArray().forEach(o => ob.place(o))

let elapsed = new Date().valueOf() - start;
const nOrdersPerSecond = Math.round(nOrders / (elapsed / 1e3));

console.log(`${nOrders} orders in ${elapsed}ms. ${nOrdersPerSecond} orders/sec`);