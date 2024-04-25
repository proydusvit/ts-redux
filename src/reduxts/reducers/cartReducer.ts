import { CartAction, CartActionTypes } from '../actions/cartActions';
export interface CartState {
  cartItems: CartItem[];
  isCartOpen: boolean;
}

export interface CartItem {
  product: string;
  color: string;
  quantity: number;
  giftWrapping: boolean;
  deliveryType: string;
}

const initialState: CartState = {
  cartItems: [],
  isCartOpen: false,
};


const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case CartActionTypes.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    default:
      return state;
  }
};

export default cartReducer;
