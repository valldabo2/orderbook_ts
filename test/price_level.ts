import { expect } from "chai";
import { PriceLevel } from "../src";
import { LimitOrder, OrderSide } from "../src";

describe("PriceLevel", () => {
    it("Can insert and remove", () => {
        let pl = new PriceLevel();
        let o: LimitOrder = {price: 1, size: 1, side: OrderSide.Buy, id: "1"}

        pl.add(o);
        expect(pl.size).equal(o.size);
        
        let o2: LimitOrder = {price: 1, size: 2, side: OrderSide.Buy, id: "2"}
        pl.add(o2);
        expect(pl.size).equal(o.size + o2.size);

        pl.remove(o2.id);
        expect(pl.size).equal(o.size);

        pl.remove(o.id);
        expect(pl.size).equal(0);
    })
})