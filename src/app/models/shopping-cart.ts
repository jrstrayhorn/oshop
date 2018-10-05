import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    cartItems: ShoppingCartItem[] = [];
    items: any;

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
      for (let productId in itemsMap)
        this.cartItems.push(itemsMap[productId]);
    }

    get totalItemsCount() {
      let count = 0;
      for (let productId in this.itemsMap)
        count += this.itemsMap[productId].quantity;
      return count;
    }
}