import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const updatedItems = state.items.concat(action.item);
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    case 'REMOVE':
      break;
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItem = (item) => dispatchCartAction({ type: 'ADD', item });
  const removeItem = (id) => dispatchCartAction({ type: 'REMOVE', id });

  const cartContext = {
    items: cartState.items,
    totalAmounts: cartState.totalAmount,
    addItem,
    removeItem
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
