import { Link, Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Icon from '@mdi/react';
import { mdiCart } from '@mdi/js';
import { useEffect, useState } from "react";

export default function Root() {
  const [products, setProducts] = useState([]);

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
            <span className={styles.cartQuantity} >1</span>
          </div>
          <Link to="cart"><button className="btn">Checkout</button></Link>
        </div>
      </nav>
      <main>
        <Outlet context={{products, setProducts}} />
      </main>
    </>
  )
}