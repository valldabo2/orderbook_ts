import { expect } from "chai";
import { PriceLevels } from "../src";
import { LimitOrder, OrderSide } from "../src";

describe("PriceLevels", () => {
    it("Can insert bid levels", () => {
        let pls = new PriceLevels(true);
        let o: LimitOrder = {price:9, size:1, side: OrderSide.Buy, id: "1"};
        pls.insert(o);
        expect(pls.best.price).equal(o.price);
        let o2: LimitOrder = {price:10, size:1, side: OrderSide.Buy, id: "2"};
        pls.insert(o2);
        expect(pls.best.price).equal(o2.price);
    })
    it("Can insert ask levels", () => {
        let pls = new PriceLevels(false);
        let o: LimitOrder = {price:11, size:1, side: OrderSide.Buy, id: "1"};
        pls.insert(o);
        expect(pls.best.price).equal(o.price);
        let o2: LimitOrder = {price:10, size:1, side: OrderSide.Buy, id: "2"};
        pls.insert(o2);
        expect(pls.best.price).equal(o2.price);
    })
})