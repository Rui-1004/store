import { useOutletContext } from "react-router-dom"
import Card from "../Card"
import styles from "./Shop.module.css"

export default function Shop() {
  const {products, setProducts} = useOutletContext();

  return(
    <>
      <h1>Shop</h1>
      <div className={styles.container}>
        { products.map(product => <Card key={product.id} product={product} />) }
      </div>
      
    </>
  )
}