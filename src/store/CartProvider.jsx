import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  let updatedItems = [...state.items];

  switch (action.type) {
    case 'ADD': {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      if (existingCartItem) {
        updatedItems.splice(existingCartItemIndex, 1, {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        });
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case 'REMOVE': {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (!existingCartItem) return;

      const currentAmount = existingCartItem.amount;

      if (currentAmount > 1) {
        existingCartItem.amount--;
      } else {
        updatedItems.splice(existingCartItemIndex, 1);
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount - existingCartItem.price,
      };
    }

    case 'CLEAR': {
      return defaultCartState;
    }

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
  const clearCart = () => dispatchCartAction({ type: 'CLEAR' });

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
