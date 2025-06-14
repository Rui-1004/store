import { Link, Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Icon from '@mdi/react';
import { mdiCart } from '@mdi/js';
import { useEffect, useState } from "react";

export default function Root() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleCart = (product, quantity) => {
    let cartItem = {...product, quantity: quantity};
    setCart(prev => {
      let index = prev.findIndex((item) => cartItem.id === item.id)

      if(index === -1) {
        return [...prev, cartItem];
      }
      else {
        let updatedItem = {
          ...prev[index],
          quantity: prev[index].quantity + cartItem.quantity
        };

        let newCart = prev.filter((item) => cartItem.id !== item.id);

        return [...newCart, updatedItem];
      }
    });
  }

  const handleTotal = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
  
    for(let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].price * cart[i].quantity;
      totalQuantity += cart[i].quantity;
    }
  
    return {price: totalPrice, quantity: totalQuantity};
  }

  let cartTotal = handleTotal();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    let isMounted = true;

    fetch("https://fakestoreapi.com/products?limit=10")
      .then(res => res.json())
      .then(json => setProducts(json))
      .catch(err => console.log(err));

    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <>
      <nav>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="shop">Shop</Link>
        </div>
        <div className={styles.links}>
          <div>
            <Icon path={mdiCart} size={1} />
            { cart.length > 0 ? <span className={styles.cartQuantity}>{cartTotal.quantity > 9 ? "9+" : cartTotal.quantity}</span> : null}
          </div>
          <Link to="cart"><button className="btn">Checkout</button></Link>
        </div>
      </nav>
      <main>
        <Outlet context={{products, setProducts, cart, setCart, handleCart, cartTotal}} />
      </main>
    </>
  )
}