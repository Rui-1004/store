import { useOutletContext } from "react-router-dom";
import CartItem from "../components/CartItem";
import styles from "./Cart.module.css";

export default function Cart() {
  const {cart, setCart, cartTotal} = useOutletContext();

  return(
    <>
      <h1>Cart</h1>
      { cart.length > 0 ? (
      <div className={styles.cartContainer}>
        <div className={styles.allItemContainer}>
          <div className={styles.itemFields}>
            <h3>Image</h3>
            <h3>Title</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <h3>Total Price</h3>
          </div>
          {cart.map((item) => <CartItem key={item.id} item={item}/>)}
        </div>
        <div className={styles.cartSummary}>
          <h3>Cart Total</h3>
          <div className={styles.cartTotalContainer}>
            <p><b>Total Price: </b>{cartTotal.price.toFixed(2)}€</p>
            <p><b>Total Quantity: </b>{cartTotal.quantity}</p>
          </div>
        </div>
      </div>
      ) :
        <p>No items in Cart</p>
      }
    </>
  )
}