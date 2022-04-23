import { useContext, useState } from 'react';

import classes from './Cart.module.css';
import Modal from 'components/UI/Modal';
import CartContext from 'store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount?.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemAddHandler = (item) =>
    cartContext.addItem({ ...item, amount: 1 });

  const cartItemRemoveHandler = (id) => cartContext.removeItem(id);

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      'https://react-course-94490-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);

    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>

      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}

      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && !isSubmitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
