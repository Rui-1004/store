import styles from "./Card.module.css";

export default function Card({product}) {
  return(
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img loading="lazy" src={product.image} alt="" />
      </div>
      <div className={styles.cardBody}>
        <p>{product.title}</p>
        <p>{product.price}€</p>
      </div>
      <div className={styles.cardInputs}>
        <div className={styles.quantityInput}>
          <button className={styles.quantityMinus}>-</button>
          <input name="quantity" type="text" />
          <button className={styles.quantityPlus}>+</button>
        </div>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </div>
  )
}