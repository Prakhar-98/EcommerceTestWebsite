import { Order } from './Order';
import { Product } from './Product';

export class OrderDetails
{
    orderId:number;
    productId:number;
    quantity:number;
    price:number;
    order:Order;
    product:Product;
}