import { fetchJson } from "./api";

 const {NEXT_PUBLIC_BASE_URL}= process.env
 export const BASE = NEXT_PUBLIC_BASE_URL

export const getProduct = async (id)=>{
  try{
    const product = await fetchJson(`${NEXT_PUBLIC_BASE_URL}/products/${id}`)
    return stripProduct(product)
  }catch(err){
    console.log('err');
    throw err
  }
}

const getProducts = async ()=> {
  try{
    const products = await fetchJson(`${NEXT_PUBLIC_BASE_URL}/products`)
    return products.map(stripProduct)
  }catch(err){
    console.log(err.message)
  }
}

export default getProducts 

const stripProduct = (product)=> {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: '$'+ product.price.toFixed(2),
    pictureUrl: NEXT_PUBLIC_BASE_URL + product.picture.url
  }
}


