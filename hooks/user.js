import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

const USER_QUERY_KEY = 'user'

export const useSignIn = ()=> {
  const queryClient = useQueryClient()
  const mutation = useMutation(({email, password})=> fetchJson("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email,password})
    }))

    return {
     signIn: async(email,password)=> {
      try{
        const user = await mutation.mutateAsync({email, password})
        queryClient.setQueryData(USER_QUERY_KEY, user)
      return true
      }catch(err){
        return false
      }
     },
     signInError: mutation.isError,
     signInLoading: mutation.isLoading, 
    }
}

export const useUser = ()=> {
  const query = useQuery(USER_QUERY_KEY, async ()=> {
    try {
      return await fetchJson("/api/user");
    } catch (err) {
      return undefined
    }
  }, {
    cacheTime: Infinity,
    staleTime: 30_000 //ms
  })
  return query.data
}

export const useSignOut = ()=> {
  const queryClient = useQueryClient()
  const mutation = useMutation(()=>fetchJson("api/logout"))

  return async()=>{
      await mutation.mutateAsync()
      queryClient.setQueryData(USER_QUERY_KEY, undefined)
    }
}
