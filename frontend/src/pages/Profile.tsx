import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useQuery } from "@tanstack/react-query"
import { getOrdersByUser } from "../api/order.service"
import { useParams } from "react-router-dom"
import OrdersTable from "../components/OrdersTable"
import { OrderToTableType, OrderType } from "../types"

function Profile () {
  
  const { user } = useContext(UserContext)
  const { given_name } = user
  const { id: userId } = useParams()
  console.log("id", userId);

  const [ tableData, setTableData ] = useState<OrderToTableType[]| []>([])

  const { data, isSuccess } = useQuery<OrderType[]>({
    queryKey: ["orders", "ordersById", userId],
    queryFn: () => getOrdersByUser(userId!),
    enabled: !!userId
  })

  console.log("ordersByUser", data);

  useEffect(() => {
    if (isSuccess && data) {
      const rawTableData = data.map( order => ({
        orderId: order._id, date: order.createdAt, total: order.cart.cart_total
      }))
      setTableData(rawTableData)
    }
  }, [isSuccess, data])


  console.log("tableData", tableData);
  

  return (
    <>
      <h1>Hello {given_name}!</h1>
      {tableData.length && 
        <OrdersTable tableData={tableData}/>
      }
    </>
  )
}

export default Profile