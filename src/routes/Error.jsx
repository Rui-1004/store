import { Link } from "react-router-dom"

export default function Error() {
  return(
    <>
      <h1>Error!</h1>

      <p>Click <Link to="/">here</Link> to return to the Home page.</p>
    </>
    
  )
}