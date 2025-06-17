import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrdersByUser } from "../api/order.service";
import { useParams } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";
import { OrderToTableType, OrderType } from "../types";
import { Typography } from "@mui/material";

function Orders() {
  const { id: userId } = useParams();
  const [tableData, setTableData] = useState<OrderToTableType[] | []>([]);

  const { data, isSuccess } = useQuery<OrderType[]>({
    queryKey: ["orders", "ordersById", userId],
    queryFn: () => getOrdersByUser(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const rawTableData = data.map((order) => ({
        orderId: order._id,
        date: order.createdAt.toLocaleString(),
        total: order.cart.cart_total,
        puzzles: order.cart.puzzles,
      }));
      setTableData(rawTableData);
    }
  }, [isSuccess, data]);

  return (
    <>
      {/* <Typography variant="h5">Hello {given_name}!</Typography> */}
      <Typography variant="h5" sx={style.CenterOrdersHeaders}>
        Order history
      </Typography>

      {tableData.length > 0 ? (
        <OrdersTable tableData={tableData} />
      ) : (
        <Typography variant="h6" sx={style.CenterOrdersText}>
          You don't have any orders yet.
        </Typography>
      )}
    </>
  );
}

export default Orders;

const style = {
  CenterOrdersHeaders: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    letterSpacing: "1px",
  },
  CenterOrdersText: {
    display: "flex",
    justifyContent: "center",
    marginTop: "100px",
    letterSpacing: "1px",
  },
};
