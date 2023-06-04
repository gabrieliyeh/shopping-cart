import cookie from "cookie"
import { fetchJson } from "../../lib/api"

const {NEXT_PUBLIC_BASE_URL}= process.env

async function handleLogin(req,res) {
  if(req.method !== "POST"){
    res.status(405).end()
    return
  }
  const {email, password} = req.body;

  try{
    const { jwt, user } = await fetchJson(`${NEXT_PUBLIC_BASE_URL}/auth/local`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      identifier: email,
      password
    }) 
  })
  
  res.status(200)
  .setHeader(
    'Set-Cookie', cookie.serialize('jwt', jwt, {
      path: '/api',
      httpOnly: true,
    })
  )
  .json({
    id: user.id,
    name:user.username
  })
  }catch(err){
    res.status(401).end()
  }
  
}

export default handleLogin