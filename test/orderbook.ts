import { expect } from "chai";
import { OrderBook } from "../src";
import { LimitOrder, OrderSide, matched_size } from "../src";


describe("Orderbook", () => {
    it("Have correct bids and asks", () => {
        let ob = new OrderBook();
        let o: LimitOrder = {price: 9, size: 1, side: OrderSide.Buy, id: "1"};
        let mo = ob.place(o);
        expect(ob.bid.price).equal(o.price);
        expect(mo.length).equal(0);

        let o2: LimitOrder = {price: 10, size: 2, side: OrderSide.Buy, id: "2"};
        mo = ob.place(o2);
        expect(ob.bid.price).equal(o2.price);
        expect(mo.length).equal(0);

        let o3: LimitOrder = {price: 9, size: 3, side: OrderSide.Sell, id: "3"};
        mo = ob.place(o3);
        expect(mo.length).equal(2);
        let ms = matched_size(mo);
        expect(ms).equal(o.size + o2.size);
        expect(ob.bid).equal(undefined);
        expect(ob.ask).equal(undefined);
    })
    it("Inserts partial match", () => {
        let ob = new OrderBook();
        let o: LimitOrder = {price: 10, size: 1, side: OrderSide.Buy, id: "1"};
        let mo = ob.place(o);

        let o2: LimitOrder = {price: 9, size: 3, side: OrderSide.Sell, id: "2"};
        mo = ob.place(o2);

        let ms = matched_size(mo);
        expect(ms).equal(o.size);
        expect(ob.bid).equal(undefined);
        expect(ob.ask.price).equal(o2.price);
        expect(ob.ask.size).equal(2);
    })
    it("Cancels order", () => {
        let ob = new OrderBook();
        let o: LimitOrder = {price: 10, size: 1, side: OrderSide.Buy, id: "1"};
        ob.place(o);
        let o2: LimitOrder = {price: 11, size: 2, side: OrderSide.Buy, id: "2"};
        ob.place(o2);
        let o3: LimitOrder = {price: 11, size: 3, side: OrderSide.Buy, id: "3"};
        ob.place(o3);

        ob.cancel(o3.id);
        expect(ob.bid.price).equal(o2.price);

        ob.cancel(o2.id);
        expect(ob.bid.price).equal(o.price);

        ob.cancel(o.id);
        expect(ob.bid).equal(undefined);
    })
})