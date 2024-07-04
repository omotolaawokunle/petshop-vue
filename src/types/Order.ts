import Product from "./Product";
import OrderStatus from "./OrderStatus";
import User from "./User";
import Payment from "./Payment";

interface Address {
    billing: string | null,
    shipping: string | null
}
interface Order {
    uuid: string,
    products: Product[],
    address: Address,
    delivery_fee: number,
    amount: number,
    created_at: string | null,
    updated_at: string | null,
    shipped_at: string | null,
    order_status: OrderStatus[],
    user: User,
    payment: Payment | null
}

export default Order;