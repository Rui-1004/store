import { useState } from "react";
import styles from "./Card.module.css";

export default function Card({product}) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  }

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  }

  const handleChange = (e) => {
    let number = parseInt(e.target.value, 10);

    if (isNaN(number) || number < 1) return;

    setQuantity(number);
  }

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
          <button className={styles.quantityMinus} onClick={handleDecrement} disabled={quantity === 1}>-</button>
          <input name="quantity" type="number" onChange={handleChange} value={quantity} min={1} step={1} />
          <button className={styles.quantityPlus} onClick={handleIncrement}>+</button>
        </div>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </div>
  )
}