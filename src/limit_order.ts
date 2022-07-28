export enum OrderSide {
    Buy = "buy",
    Sell = "sell",
}
export interface LimitOrder {
    price: number,
    size: number,
    side: OrderSide,
    id: string
}