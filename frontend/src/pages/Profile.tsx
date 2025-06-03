import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { QueryFunctionContext, useQuery } from "@tanstack/react-query"
import { getOrdersByUser } from "../api/order.service"
import { useParams } from "react-router-dom"

function Profile () {
  
  const { user } = useContext(UserContext)
  const { given_name } = user
  const { id: userId } = useParams()
  console.log("id", userId);

  const { data } = useQuery({
    queryKey: ["orders", "ordersById", userId],
    queryFn: () => getOrdersByUser(userId!),
    enabled: !!userId
  })

  console.log("ordersByUser", data);

  return (
    <>
    <h1>Hello {given_name}!</h1>
    
    </>
  )
}

export default Profile