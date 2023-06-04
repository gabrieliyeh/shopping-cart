import { useQuery } from "react-query"
import Button from "../components/Button"
import CartTable from "../components/CartTable"
import Page from "../components/Page"
import { fetchJson } from "../lib/api"

const CartPage = ()=> {
  const query = useQuery('cartItems', ()=> fetchJson('/api/cart'))
  const cartItems= query.data

  return(
    <Page title="Cart">
      {cartItems && <CartTable cartItems={cartItems}/>}
      <Button>
        Check out
      </Button>
    </Page>
  )
}

export default CartPage