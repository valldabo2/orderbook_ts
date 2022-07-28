import { expect } from "chai";
import { LimitOrder, OrderSide } from "../src";

describe("LimitOrder", () => {
    it("Can be initialized", () => {
        let o: LimitOrder = {price:2, size:1, side: OrderSide.Buy, id: "1"};
        expect(o.price).equal(2);
    })
})