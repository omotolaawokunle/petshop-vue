import Order from "./Order";
import Product from "./Product";
import User from "./User";
import Payment from "./Payment";
import OrderStatus from "./OrderStatus";
export interface Paginated{
    current_page: number,
    data: object[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: object[],
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}

export interface NonPaginated{
    success: boolean,
    data: Order | Product | User | OrderStatus | Payment,
    error: string | null,
    errors: object[] | string[],
    extra?: object[] | string[]
}