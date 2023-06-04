import getProducts from "../../lib/getProducts"

async function handler(req, res) {
  const products = await getProducts()
  return res.status(200).json(products)
}


export default handler