import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { fetchJson } from "../lib/api";
import { useUser } from "../hooks/user";
import Button from "./Button"


const AddToCart = ({productId})=> {
  const router = useRouter()
  const [quantity,setQuantity]= useState(1)
  const [error, setError]= useState('')
  const user = useUser()
  const mutation= useMutation(()=> fetchJson('/api/cart', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({productId, quantity})
  }))

  const handleClick = async ()=> {
    if(!user){
      setError('You have to log in to add to cart')
    
    }else{
      setError(null)
      await mutation.mutateAsync()
      router.push('/cart')
    }
  
  }

  return (
    <>
 
    <div className="py-2">
      <input
      className="border rounded px-3 py-1 mr-2 w-16 text-right"
       type="number"
       min='1' 
       id="quantity"
       value={quantity.toString()} 
       onChange={
        (e)=> setQuantity(parseInt(e.target.value))} />
        {mutation.isLoading ? (
          <p>Loading...</p>
        ): (
          <Button onClick={handleClick}>
           Add to cart
        </Button>
        )}
    </div>
    {error && <small className="text-red-600 block">{error} </small> }
    </>
  )

}


export default AddToCart