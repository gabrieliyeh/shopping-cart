import React, { useState } from 'react'
import { fetchJson } from '../lib/api';
import { useMutation } from "react-query";

function formatCurrency(value){
  return '$' + value.toFixed(2)
}
function buildCart(cartItems) {
  let total = 0.0
  const items = []
  for( const cartItem of cartItems){
    const itemTotal = cartItem.product.price * cartItem.quantity;
    total+= itemTotal
    items.push({...cartItem, total: itemTotal})
  }
  return {items, total}
}


const CartTable = ({cartItems}) => {
  const cart = buildCart(cartItems)
  const [error, setError]= useState('')

  const mutation= useMutation((productId)=> fetchJson(`/api/cart/${productId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    
  }))

  const handleDelete = async (id)=> {
    try {
      await mutation.mutateAsync(id)
     setError(null)
   } catch (err) {
    console.log(err.message);
    setError('Something went wrong try again later')
   } 
  }
  return (
    <table>
      <thead>
      <tr>
      <th className='px-4 py-2'>
        Product
      </th>
      <th className='px-4 py-2'>
        Price
      </th>
      <th className='px-4 py-2'>
        Quantity
      </th>
      <th className='px-4 py-2'>
        Total
      </th>
      </tr>
      </thead>
        <tbody>
        {cart.items.map(cartItem=> (
          <tr key={cartItem.id}>
            <td className='px-4 py-2'>
              {cartItem.product.title}
            </td>
            <td className='px-4 py-2 text-right'>
              {cartItem.product.price}
            </td>
            <td className='px-4 py-2 text-right'>
              {cartItem.quantity}
            </td>
            <td className='px-4 py-2 text-right'>
              {formatCurrency(cartItem.total)}
            </td>
            <td className='px-4 py-2 text-right'>
              <button onClick={()=>handleDelete(cartItem.id)} className='btn'>
                remove
              </button>
              {error && cartItem.id === 22 &&<p>{error}</p> }
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <th className='px-4 py-2 text-left'>
              Total
            </th>
            <th>
            </th>
            <th>
            </th>
            <th className='px-4 py-2 text-right'>
              {formatCurrency(cart.total)}
            </th>
          </tr>
        </tfoot>
    </table>
  )
}

export default CartTable
