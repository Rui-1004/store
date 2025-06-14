import styles from "./CartItem.module.css";

export default function CartItem({item}) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.cartImageWrapper}>
        <img src={item.image} alt="" />
      </div>
      <h3>{item.title}</h3>
      <p>{item.price.toFixed(2)}€</p>
      <p>{item.quantity}</p>
      <p>{(item.price * item.quantity).toFixed(2)}€</p>
    </div>
  )
}