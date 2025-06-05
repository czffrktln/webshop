import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getOrdersByUser } from "../api/order.service";
import { useParams } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";
import { OrderToTableType, OrderType } from "../types";
import { Typography } from "@mui/material";

function Profile() {
  const { user } = useContext(UserContext);
  const { given_name } = user;
  const { id: userId } = useParams();
  console.log("id", userId);

  const [tableData, setTableData] = useState<OrderToTableType[] | []>([]);

  const { data, isSuccess } = useQuery<OrderType[]>({
    queryKey: ["orders", "ordersById", userId],
    queryFn: () => getOrdersByUser(userId!),
    enabled: !!userId,
  });

  console.log("ordersByUser", data);

  useEffect(() => {
    if (isSuccess && data) {
      const rawTableData = data.map((order) => ({
        orderId: order._id,
        date: order.createdAt,
        total: order.cart.cart_total,
        puzzles: order.cart.puzzles,
      }));
      setTableData(rawTableData);
    }
  }, [isSuccess, data]);

  console.log("tableData", tableData);

  return (
    <>
      {/* <Typography variant="h5">Hello {given_name}!</Typography> */}
      <Typography
        variant="h5"
        align="center"
        marginTop="20px"
        sx={{ letterSpacing: "1px" }}
      >
        Order history
      </Typography>

      {tableData.length && <OrdersTable tableData={tableData} />}
    </>
  );
}

export default Profile;
