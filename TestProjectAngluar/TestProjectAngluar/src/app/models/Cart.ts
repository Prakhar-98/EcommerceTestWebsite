import { Product } from "./Product";
import { User } from "./User";

export class Cart
{
    productId:number;
    userId:number;
    quantity:number;
    product:Product;
    user:User;
    constructor(pid,uid,q)
    {
        this.productId=pid;
        this.userId=uid;
        this.quantity=q;
    }
}