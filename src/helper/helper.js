import { getSession } from 'next-auth/react'

export const authHeader = async () => {
    const session = await getSession()
    if(session?.user?.token){
      return {
        'Content-Type': 'application/json', 'Authorization': `Token ${session?.user?.token}`
      }
    }
  }