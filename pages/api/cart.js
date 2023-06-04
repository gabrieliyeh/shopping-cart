import { fetchJson } from "../../lib/api";

const { NEXT_PUBLIC_BASE_URL } = process.env;

const stripCartItems = (item) => {
  return {
    id: item.id,
    product: {
      id: item.product.id,
      title: item.product.title,
      price: item.product.price,
    },
    quantity: item.quantity,
  };
};

async function handleGetCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const cartItems = await fetchJson(`${NEXT_PUBLIC_BASE_URL}/cart-items`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    res.status(200).json(cartItems.map(stripCartItems));
  } catch (err) {
    res.status(401).end();
  }
}

async function handleDeleteCart(req, res) {
  console.log('e reach here');
  
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const {productId} = req.query;
  console.log(productId);
  
  const Id = productId

  try {
   await fetchJson(`${NEXT_PUBLIC_BASE_URL}//cart-items/${Id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": 'application/json'
      },
    });
    res.status(200).json({message: "Deleted Successfully"});
  } catch (err) {
    res.status(401).end();
  }
}

async function handlePostCart(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { productId, quantity } = req.body;
  try {
     await fetchJson(`${NEXT_PUBLIC_BASE_URL}/cart-items`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({product: productId, quantity})
    })
    res.status(200).json({})
  } catch (err) {
    res.status(401).end()
  }
}

async function handleCart(req, res) {
  switch (req.method) {
    case "GET":
      return handleGetCart(req, res);
    case "POST":
      return handlePostCart(req, res);
    case "DELETE":
      return handleDeleteCart(req, res);
    default:
      res.status(405).end();
  }
}

export default handleCart;
