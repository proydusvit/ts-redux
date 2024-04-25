export enum CartActionTypes {
  ADD_TO_CART = 'ADD_TO_CART',
  TOGGLE_CART = 'TOGGLE_CART',
}


export interface CartItem {
  product: string;
  color: string;
  quantity: number;
  giftWrapping: boolean;
  deliveryType: 'express' | 'standard';
}

export interface AddToCartAction {
    type: CartActionTypes.ADD_TO_CART;
    payload: CartItem;
}

export interface ToggleCartAction {
    type: CartActionTypes.TOGGLE_CART;
}


export type CartAction = AddToCartAction | ToggleCartAction;


export const addToCart = (item: CartItem) => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: item,
});
export const toggleCart = () => ({
  type: CartActionTypes.TOGGLE_CART,
});