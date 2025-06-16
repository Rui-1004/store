import { useState } from "react";
import styles from "./Card.module.css";

export default function Card({product, handleCart}) {
  const [quantity, setQuantity] = useState(1);
  const [inputValue, setInputValue] = useState("1");

  const handleIncrement = () => {
    setQuantity(q => {
      const newQ = q + 1;
      setInputValue(String(newQ));
      return newQ;
    });
  }

  const handleDecrement = () => {
    setQuantity(q => {
      const newQ = q - 1;
      setInputValue(String(newQ));
      return newQ;
    });
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleBlur = () => {
    let validQuantity = Math.floor(parseFloat(inputValue));
    if (isNaN(validQuantity) || validQuantity < 1) {
      validQuantity = 1;
    }
    setQuantity(validQuantity);
    setInputValue(validQuantity);
  };

  const handleClick = () => {
    let validQuantity = Math.floor(parseFloat(inputValue));

    if (isNaN(validQuantity) || validQuantity < 1) {
      validQuantity = 1;
    }

    setQuantity(validQuantity);
    handleCart(product, validQuantity);
  }

  return(
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img loading="lazy" src={product.image} alt={product.title} />
      </div>
      <div className={styles.cardBody}>
        <h3>{product.title}</h3>
        <p>{product.price.toFixed(2)}€</p>
      </div>
      <div className={styles.cardInputs}>
        <div className={styles.quantityInput}>
          <button className={styles.quantityMinus} onClick={handleDecrement} disabled={quantity === 1}>-</button>
          <input name="quantity" type="number" onChange={handleChange} onBlur={handleBlur} value={inputValue} min={1} step={1}/>
          <button className={styles.quantityPlus} onClick={handleIncrement}>+</button>
        </div>
        <button className={styles.addToCart} onClick={handleClick}>Add to Cart</button>
      </div>
    </div>
  )
}